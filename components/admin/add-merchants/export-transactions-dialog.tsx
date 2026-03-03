import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useExportMerchantTransactionList from "@/hooks/query/useExportMerchantTransactionList";
import { getDatesFromRangeOption } from "@/lib/helper";
import { DateRangeOption, ExportTypeMerchant } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const exportMerchantTransactionSchema = z.object({
  businessName: z.string().optional(),
  merchantEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  merchantPhoneNo: z.string().optional(),
  merchantId: z.string().optional(),
  approvalStatus: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
});

type ExportMerchantTransactionFormData = z.infer<typeof exportMerchantTransactionSchema>;

interface ExportTransactionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportTransactionsDialog({ open, onOpenChange }: Readonly<ExportTransactionsDialogProps>) {
  const { handleExportMerchantTransactionList, isPending, isSuccess, reset } = useExportMerchantTransactionList();

  const todayDates = useMemo(() => getDatesFromRangeOption('Today'), []);
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('Today');
  const [startDate, setStartDate] = useState<Date | undefined>(todayDates?.start);
  const [endDate, setEndDate] = useState<Date | undefined>(todayDates?.end);

  const form = useForm<ExportMerchantTransactionFormData>({
    resolver: zodResolver(exportMerchantTransactionSchema),
    defaultValues: {
      businessName: "",
      merchantEmail: "",
      merchantPhoneNo: "",
      merchantId: "",
      approvalStatus: "",
      startDate: todayDates?.start,
      endDate: todayDates?.end,
    },
  });

  const handleDateRangeOptionChange = useCallback((option: DateRangeOption) => {
    setDateRangeOption(option);

    if (option && option !== 'Custom Range') {
      const dates = getDatesFromRangeOption(option);
      if (dates) {
        setStartDate(dates.start);
        setEndDate(dates.end);
        form.setValue("startDate", dates.start, { shouldValidate: true });
        form.setValue("endDate", dates.end, { shouldValidate: true });
      }
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [form]);

  const handleCustomDatesChange = useCallback((customStart: Date | undefined, customEnd: Date | undefined) => {
    if (dateRangeOption === 'Custom Range') {
      setStartDate(customStart);
      setEndDate(customEnd);
      if (customStart) {
        form.setValue("startDate", customStart, { shouldValidate: true });
      }
      if (customEnd) {
        form.setValue("endDate", customEnd, { shouldValidate: true });
      }
    }
  }, [dateRangeOption, form]);

  const handleClose = useCallback(() => {
    form.reset();
    setStartDate(todayDates?.start);
    setEndDate(todayDates?.end);
    setDateRangeOption('Today');
    reset();
    onOpenChange(false);
  }, [form, onOpenChange, reset, todayDates]);

  const handleSubmit = (formData: ExportMerchantTransactionFormData) => {
    if (!formData.startDate || !formData.endDate) {
      form.setError("startDate", { message: "Date range is required" });
      return;
    }

    const payload: ExportTypeMerchant = {
      startDate: format(formData.startDate, "dd-MM-yyyy"),
      endDate: format(formData.endDate, "dd-MM-yyyy"),
    };

    if (formData.businessName) payload.businessName = formData.businessName;
    if (formData.merchantEmail) payload.merchantEmail = formData.merchantEmail;
    if (formData.merchantPhoneNo) payload.merchantPhoneNo = formData.merchantPhoneNo;
    if (formData.merchantId) payload.merchantId = formData.merchantId;
    if (formData.approvalStatus) payload.approvalStatus = formData.approvalStatus;

    if (payload.approvalStatus) {
      payload.approvalStatus = payload.approvalStatus.toUpperCase();
    }

    handleExportMerchantTransactionList(payload);
  };

  useEffect(() => {
    if (isSuccess && open) {
      handleClose();
    }
  }, [isSuccess, open, handleClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Export Transactions</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Status Selection */}
                <FormField
                  control={form.control}
                  name="approvalStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label htmlFor="status" className="text-sm font-medium text-[#838383]">
                        Status
                      </label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full p-5 shadow-none">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUCCESSFUL">SUCCESSFUL</SelectItem>
                          <SelectItem value="FAILED">FAILED</SelectItem>
                          <SelectItem value="RECYCLED">RECYCLED</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInputTopLabel
                  control={form.control}
                  name="businessName"
                  label="Business Name"
                  placeholder="Business Name"
                />

                <FormInputTopLabel
                  control={form.control}
                  name="merchantEmail"
                  label="Merchant Email"
                  type="email"
                  placeholder="Merchant Email"
                />

                <FormInputTopLabel
                  control={form.control}
                  name="merchantPhoneNo"
                  label="Merchant Phone"
                  placeholder="Merchant Phone"
                />

                <FormInputTopLabel
                  control={form.control}
                  name="merchantId"
                  label="Merchant ID"
                  placeholder="Merchant ID"
                />
              </div>
            </form>
          </Form>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-4">
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
  );
}
