import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import useExportAdminList from "@/hooks/query/useExportAdminList";
import { useDateSelection } from "@/hooks/utils/useDateSelection";
import { exportAdminListParams, ExportDialogParam } from "@/lib/types";
import { exportAdminListSchema } from "@/schema/all-export-schema";
import { ExportAdminListFormData } from "@/schema/export-schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function ExportAdminListDialog({ open, onOpenChange }: Readonly<ExportDialogParam>) {

    const { handleExportAdminList, isPending, reset } = useExportAdminList();

    const form = useForm<ExportAdminListFormData>({
        resolver: zodResolver(exportAdminListSchema),
        defaultValues: {
            employeeName: "",
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


    const handleSubmit = (formData: ExportAdminListFormData) => {
        if (!formData.startDate || !formData.endDate) {
            form.setError("startDate", { message: "Date range is required" });
            return;
        }

        const payload: exportAdminListParams = {
            startDate: format(formData.startDate, "dd-MM-yyyy"),
            endDate: format(formData.endDate, "dd-MM-yyyy"),
        };

        if (formData.employeeName) payload.employeeName = formData.employeeName;


        handleExportAdminList(payload);
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
            <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle>Export Admin List</DialogTitle>
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
                                </div>

                                {/* Business Name */}
                                <FormField
                                    control={form.control}
                                    name="employeeName"
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
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    className="px-6 py-2"
                                >
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
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}