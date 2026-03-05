'use client';

import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import useExportPurchaseTransaction from "@/hooks/query/useExportPurchaseTransaction";
import { useDateSelection } from "@/hooks/utils/useDateSelection";
import { ExportDialogParam } from "@/lib/types";
import { exportPurchaseTransactionSchema } from "@/schema/all-export-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


type ExportPurchaseTransactionFormData = z.infer<typeof exportPurchaseTransactionSchema>;

export function ExportPurchaseTransactionDialog({ open, onOpenChange }: Readonly<ExportDialogParam>) {
  const { handleExportPurchaseTransaction, isSuccess, isPending, reset } = useExportPurchaseTransaction();

  const form = useForm<ExportPurchaseTransactionFormData>({
    resolver: zodResolver(exportPurchaseTransactionSchema),
    defaultValues: {
      dealName: "",
      dealId: "",
      transactionId: "",
      purchaseId: "",
      customerName: "",
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
    resetDates,
  } = useDateSelection(form);

  const handleClose = useCallback(() => {
    form.reset();
    resetDates();
    reset();
    onOpenChange(false);
  }, [form, onOpenChange, reset, resetDates]);

  const handleSubmit = (formData: ExportPurchaseTransactionFormData) => {
    if (!formData.startDate || !formData.endDate) {
      form.setError("startDate", { message: "Date range is required" });
      return;
    }

    const payload = {
      startDate: format(formData.startDate, "dd-MM-yyyy"),
      endDate: format(formData.endDate, "dd-MM-yyyy"),
      ...(formData.dealName ? { dealName: formData.dealName } : {}),
      ...(formData.dealId ? { dealId: formData.dealId } : {}),
      ...(formData.transactionId ? { transactionId: formData.transactionId } : {}),
      ...(formData.purchaseId ? { purchaseId: formData.purchaseId } : {}),
      ...(formData.customerName ? { customerName: formData.customerName } : {}),
    };

    handleExportPurchaseTransaction(payload);
  };

  useEffect(() => {
    if (isSuccess && open) {
      handleClose();
    }
  }, [isSuccess, open, handleClose]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Purchase Transactions</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Date Range - Required */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                <FormInputTopLabel
                  control={form.control}
                  name="purchaseId"
                  label="Purchase ID"
                  placeholder="Purchase ID"
                />
              </div>

              {/* Optional Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInputTopLabel
                  control={form.control}
                  name="customerName"
                  label="Customer Name"
                  placeholder="Customer Name"
                />
                <FormInputTopLabel
                  control={form.control}
                  name="dealName"
                  label="Deal Name"
                  placeholder="Deal Name"
                />
                <FormInputTopLabel
                  control={form.control}
                  name="dealId"
                  label="Deal ID"
                  placeholder="Deal ID"
                />
                <FormInputTopLabel
                  control={form.control}
                  name="transactionId"
                  label="Transaction ID"
                  placeholder="Transaction ID"
                />

              </div>
            </form>
          </Form>
        </div>

        <div className="py-4 border-t flex justify-end gap-4">
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
