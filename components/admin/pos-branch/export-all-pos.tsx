import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import useExportPos from "@/hooks/query/useExportPos";
import { useDateSelection } from "@/hooks/utils/useDateSelection";
import { ExportDialogParam, ExportPosParam } from "@/lib/types";
import { exportPosSchema } from "@/schema/all-export-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type ExportPosFormData = z.infer<typeof exportPosSchema>;

export function ExportAllPos({ open, onOpenChange }: Readonly<ExportDialogParam>) {

  const { handleExportPos, isPending, isSuccess, reset } = useExportPos();

  const form = useForm<ExportPosFormData>({
    resolver: zodResolver(exportPosSchema),
    defaultValues: {
      merchantId: "",
      branchId: "",
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

  const handleClose = useCallback(() => {
    form.reset();
    resetDates();
    reset();
    onOpenChange(false);
  }, [form, onOpenChange, reset, resetDates]);

  //handle submit
  const handleSubmit = (formData: ExportPosFormData) => {
    if (!formData.startDate || !formData.endDate) {
      form.setError("startDate", { message: "Date range is required" });
      return;
    }

    const payload: ExportPosParam = {
      startDate: format(formData.startDate, "dd-MM-yyyy"),
      endDate: format(formData.endDate, "dd-MM-yyyy"),
    };

    if (formData.merchantId) payload.merchantId = formData.merchantId;
    if (formData.branchId) payload.branchId = formData.branchId;

    handleExportPos(payload);
  }

  useEffect(() => {
    if (isSuccess && open) {
      handleClose();
    }
  }, [isSuccess, open, handleClose]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export All POS</DialogTitle>
        </DialogHeader>


        <div className="flex-1 overflow-y-auto  py-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1  gap-4">
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
                  {form.formState.errors.startDate && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.startDate.message}
                    </p>
                  )}
                  {form.formState.errors.endDate && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.endDate.message}
                    </p>
                  )}
                </div>

              </div>

              {/* Optional Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInputTopLabel
                  control={form.control}
                  name="merchantId"
                  label="Merchant ID"
                  placeholder="Merchant ID"
                />

                <FormInputTopLabel
                  control={form.control}
                  name="branchId"
                  label="Branch ID"
                  placeholder="Branch ID"
                />


              </div>
            </form>
          </Form>
        </div>

        <div className=" py-4 border-t flex justify-end gap-4">
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>

          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending || !startDate || !endDate}
            className="bg-theme-dark-green text-white disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isPending}
            type="submit"
            loadingText="Exporting..."
          >
            Export Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}