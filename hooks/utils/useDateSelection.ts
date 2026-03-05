import { getDatesFromRangeOption } from "@/lib/helper";
import { DateRangeOption } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

export function useDateSelection<T extends FieldValues>(form: UseFormReturn<T>) {
  const todayDates = useMemo(() => getDatesFromRangeOption('Today'), []);
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('Today');
  const [startDate, setStartDate] = useState<Date | undefined>(todayDates?.start);
  const [endDate, setEndDate] = useState<Date | undefined>(todayDates?.end);

  const handleDateRangeOptionChange = useCallback((option: DateRangeOption) => {
    setDateRangeOption(option);

    if (option && option !== 'Custom Range') {
      const dates = getDatesFromRangeOption(option);
      if (dates) {
        setStartDate(dates.start);
        setEndDate(dates.end);
        form.setValue("startDate" as Path<T>, dates.start as PathValue<T, Path<T>>, { shouldValidate: true });
        form.setValue("endDate" as Path<T>, dates.end as PathValue<T, Path<T>>, { shouldValidate: true });
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
        form.setValue("startDate" as Path<T>, customStart as PathValue<T, Path<T>>, { shouldValidate: true });
      }
      if (customEnd) {
        form.setValue("endDate" as Path<T>, customEnd as PathValue<T, Path<T>>, { shouldValidate: true });
      }
    }
  }, [dateRangeOption, form]);

  const resetDates = useCallback(() => {
    setStartDate(todayDates?.start);
    setEndDate(todayDates?.end);
    setDateRangeOption('Today');
  }, [todayDates]);

  return {
    dateRangeOption,
    startDate,
    endDate,
    handleDateRangeOptionChange,
    handleCustomDatesChange,
    resetDates
  };
}
