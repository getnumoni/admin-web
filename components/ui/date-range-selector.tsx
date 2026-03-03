'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRangeOption } from "@/lib/types";
import { endOfMonth, endOfToday, endOfWeek, endOfYesterday, format, startOfMonth, startOfToday, startOfWeek, startOfYesterday, subMonths } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface DateRangeSelectorProps {
  value: DateRangeOption;
  onValueChange: (option: DateRangeOption) => void;
  onDatesChange?: (startDate: Date | undefined, endDate: Date | undefined) => void;
  placeholder?: string;
  showAllTime?: boolean;
  showCustomRange?: boolean;
  className?: string;
  disabled?: boolean;
}

export function DateRangeSelector({
  value,
  onValueChange,
  onDatesChange,
  placeholder = 'Select Date Range',
  showAllTime = false,
  showCustomRange = false,
  className,
  disabled = false,
}: Readonly<DateRangeSelectorProps>) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>();
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>();
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  // Use ref to store the latest callback to avoid dependency issues
  const onDatesChangeRef = useRef(onDatesChange);

  // Update ref when callback changes
  useEffect(() => {
    onDatesChangeRef.current = onDatesChange;
  }, [onDatesChange]);

  const handleOptionChange = useCallback((option: DateRangeOption) => {
    setPopoverOpen(false);

    if (option === 'Custom Range' && showCustomRange) {
      // Open the custom date dialog
      setTempStartDate(customStartDate);
      setTempEndDate(customEndDate);
      setTimeout(() => setCustomDialogOpen(true), 150);
      return;
    }

    onValueChange(option);

    if (!onDatesChange) return;

    let start: Date | undefined;
    let end: Date | undefined;

    const now = new Date();

    switch (option) {
      case 'Today':
        start = startOfToday();
        end = endOfToday();
        break;
      case 'Yesterday':
        start = startOfYesterday();
        end = endOfYesterday();
        break;
      case 'This Week':
        start = startOfWeek(now);
        end = endOfWeek(now);
        break;
      case 'This Month':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case 'Last Month': {
        const lastMonth = subMonths(now, 1);
        start = startOfMonth(lastMonth);
        end = endOfMonth(lastMonth);
        break;
      }
      case 'All Time':
      default:
        start = undefined;
        end = undefined;
        break;
    }

    onDatesChange(start, end);
  }, [onValueChange, showCustomRange, onDatesChange, customStartDate, customEndDate]);

  const handleApplyCustomDates = useCallback(() => {
    setCustomStartDate(tempStartDate);
    setCustomEndDate(tempEndDate);
    setCustomDialogOpen(false);
    onValueChange('Custom Range');
    if (onDatesChange) {
      onDatesChange(tempStartDate, tempEndDate);
    }
  }, [tempStartDate, tempEndDate, onValueChange, onDatesChange]);

  const handleCancelCustomDates = useCallback(() => {
    setTempStartDate(customStartDate);
    setTempEndDate(customEndDate);
    setCustomDialogOpen(false);
  }, [customStartDate, customEndDate]);

  // Reset custom dates when switching away from Custom Range
  useEffect(() => {
    if (value !== 'Custom Range') {
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
  }, [value]);

  const options: Array<{ value: DateRangeOption; label: string }> = [
    ...(showAllTime ? [{ value: null as DateRangeOption, label: 'All Time' }] : []),
    { value: 'Today' as DateRangeOption, label: 'Today' },
    { value: 'Yesterday' as DateRangeOption, label: 'Yesterday' },
    { value: 'This Week' as DateRangeOption, label: 'This Week' },
    { value: 'This Month' as DateRangeOption, label: 'This Month' },
    { value: 'Last Month' as DateRangeOption, label: 'Last Month' },
    ...(showCustomRange ? [{ value: 'Custom Range' as DateRangeOption, label: 'Custom Range' }] : []),
  ];

  return (
    <>
      <div className={className}>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal gap-2 p-5 shadow-none"
              disabled={disabled}
            >
              <span>{value || placeholder}</span>
              <ChevronDownIcon className="h-4 w-4 ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-38 p-1 shadow-none">
            {options.map((option) => (
              <button
                key={option.value || 'null'}
                className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${value === option.value
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-100'
                  }`}
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Custom Date Range Modal */}
      <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Custom Date Range</DialogTitle>
            <DialogDescription>
              Choose a start and end date for your custom date range.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-3">
              <label htmlFor="start-date-calendar" className="text-sm font-medium">Start Date</label>
              <div className="flex flex-col items-center" id="start-date-calendar">
                <Calendar
                  mode="single"
                  selected={tempStartDate}
                  onSelect={(date) => {
                    setTempStartDate(date);
                    if (date && tempEndDate && date > tempEndDate) {
                      setTempEndDate(undefined);
                    }
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(23, 59, 59, 999);
                    return date > today || (tempEndDate ? date > tempEndDate : false);
                  }}
                  className="rounded-md border"
                />
                {tempStartDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {format(tempStartDate, "PPP")}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="end-date-calendar" className="text-sm font-medium">End Date</label>
              <div className="flex flex-col items-center" id="end-date-calendar">
                <Calendar
                  mode="single"
                  selected={tempEndDate}
                  onSelect={setTempEndDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(23, 59, 59, 999);
                    return date > today || (tempStartDate ? date < tempStartDate : false);
                  }}
                  className="rounded-md border"
                />
                {tempEndDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {format(tempEndDate, "PPP")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelCustomDates}>
              Cancel
            </Button>
            <Button
              onClick={handleApplyCustomDates}
              disabled={!tempStartDate || !tempEndDate}
              className="bg-theme-dark-green text-white"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

