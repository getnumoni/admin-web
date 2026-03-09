import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormCalendarInput } from "@/components/ui/form-calendar-input";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import useExportSupportTicketList from "@/hooks/query/useExportSupportTicketList";
import { useDateSelection } from "@/hooks/utils/useDateSelection";
import { ExportDialogParam, exportSupportTicketListParams } from "@/lib/types";
import { exportSupportTicketListSchema } from "@/schema/all-export-schema";
import { ExportSupportTicketListFormData } from "@/schema/export-schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function ExportSupportTicketDialog({ open, onOpenChange }: Readonly<ExportDialogParam>) {
  const { handleExportSupportTicketList, isPending, reset } = useExportSupportTicketList();

  const form = useForm<ExportSupportTicketListFormData>({
    resolver: zodResolver(exportSupportTicketListSchema),
    defaultValues: {
      empName: "",
      userType: "",
      userId: "",
      status: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    dateRangeOption,
    startDate,
    endDate,
    handleDateRangeOptionChange,
    handleCustomDatesChange,
    resetDates
  } = useDateSelection(form);

  const handleSubmit = (formData: ExportSupportTicketListFormData) => {
    if (!formData.startDate || !formData.endDate) {
      form.setError("startDate", { message: "Date range is required" });
      return;
    }

    const payload: exportSupportTicketListParams = {
      startDate: format(formData.startDate, "dd-MM-yyyy"),
      endDate: format(formData.endDate, "dd-MM-yyyy"),
    };

    if (formData.empName) payload.empName = formData.empName;
    if (formData.userType) payload.userType = formData.userType;
    if (formData.userId) payload.userId = formData.userId;
    if (formData.status) payload.status = formData.status;
    if (formData.createdDate) payload.createdDate = format(formData.createdDate, "dd-MM-yyyy");
    if (formData.closingDate) payload.closingDate = format(formData.closingDate, "dd-MM-yyyy");

    handleExportSupportTicketList(payload);
  };

  const handleClose = useCallback(() => {
    form.reset();
    resetDates();
    reset();
    onOpenChange(false);
  }, [form, resetDates, reset, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Export Support Tickets</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Date Range Picker - Required */}
                <div className="space-y-2">
                  <label htmlFor="dateRange" className="text-sm font-medium text-[#838383]">
                    Date Range <span className="text-red-500">*</span>
                  </label>
                  <DateRangeSelector
                    value={dateRangeOption}
                    onValueChange={handleDateRangeOptionChange}
                    onDatesChange={handleCustomDatesChange}
                    showCustomRange={true}
                    className="pt-3"
                    placeholder="Select Date Range"
                  />
                </div>

                {/* Status */}
                <FormSelectTopLabel
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Select status"
                  options={[
                    { label: "Open", value: "OPEN" },
                    { label: "Closed", value: "CLOSED" },
                    { label: "Pending", value: "PENDING" },
                  ]}
                />

                {/* Employee Name */}
                <FormField
                  control={form.control}
                  name="empName"
                  render={({ field }) => (
                    <FormItem>
                      <FormInputTopLabel
                        control={form.control}
                        label="Employee Name"
                        placeholder="Enter employee name"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* User Type */}
                <FormSelectTopLabel
                  control={form.control}
                  name="userType"
                  label="User Type"
                  placeholder="Select user type"
                  options={[
                    { label: "Customer", value: "CUSTOMER" },
                    { label: "Merchant", value: "MERCHANT" },
                    { label: "Admin", value: "ADMIN" },
                  ]}
                />

                {/* User ID */}
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormInputTopLabel
                        control={form.control}
                        label="User ID"
                        placeholder="Enter user ID"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Created Date */}
                <FormCalendarInput
                  control={form.control}
                  name="createdDate"
                  label="Created Date"
                  placeholder="Select created date"
                />

                {/* Closing Date */}
                <FormCalendarInput
                  control={form.control}
                  name="closingDate"
                  label="Closing Date"
                  placeholder="Select closing date"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="px-6 py-2 h-[42px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={form.handleSubmit(handleSubmit)}
                  disabled={isPending || !startDate || !endDate}
                  className="bg-theme-dark-green text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 h-[42px]"
                  isLoading={isPending}
                  type="submit"
                  loadingText="Exporting..."
                >
                  Export Data
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}