"use client"

import { formatNumberWithCommas, removeCommasFromNumber } from '@/lib/helper'
import { Control, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './form'

interface FormNumberInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setValue: UseFormSetValue<T>
}

export function FormNumberInput<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  disabled,
  required,
  placeholder,
  onKeyDown,
  setValue,
}: FormNumberInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="w-full">
          <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#838383]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <FormControl>
            <input
              {...field}
              id={name}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              onKeyDown={onKeyDown}
              value={field.value ? formatNumberWithCommas(field.value.toString()) : ''}
              onChange={(e) => {
                // Remove commas and any non-numeric characters except decimal point
                const cleanValue = removeCommasFromNumber(e.target.value).replace(/[^0-9.]/g, '');
                // Convert to number and store for validation
                const numericValue = cleanValue ? parseFloat(cleanValue) : 0;
                // Store the numeric value in form state
                setValue(name, numericValue as PathValue<T, Path<T>>);
                // Update the field value for display
                field.onChange(numericValue);
              }}
              className={`w-full rounded-lg border px-4 py-3 text-base text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed ${error
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500'
                }`}
            />
          </FormControl>
          <div className="min-h-[20px]">
            <FormMessage className="text-sm text-red-600" />
          </div>
        </FormItem>
      )}
    />
  )
}
