'use client';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Button } from './button';

interface FormCalendarInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function FormCalendarInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  disabled = false,
  required = false,
  className,
}: FormCalendarInputProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: required ? `${label} is required` : false },
  });

  const selectedDate = value ? new Date(value) : undefined;

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-12 px-3 py-3 shadow-none",
              !selectedDate && "text-gray-500",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                // Convert to YYYY-MM-DD format for form compatibility
                const formattedDate = format(date, "yyyy-MM-dd");
                onChange(formattedDate);
              }
            }}
            disabled={(date) => date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
}
