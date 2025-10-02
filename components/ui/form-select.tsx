"use client"

import { ChevronDown } from 'lucide-react'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './form'

interface FormSelectTopLabelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label: string
  options: { value: string; label: string }[]
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  placeholder?: string
}

export function FormSelectTopLabel({
  control,
  name,
  label,
  options,
  disabled,
  required,
  multiple,
  placeholder,
}: FormSelectTopLabelProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#838383]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <FormControl>
            <div className="relative">
              <select
                {...field}
                id={name}
                disabled={disabled}
                multiple={multiple}
                value={field.value || (multiple ? [] : '')}
                onChange={(e) => {
                  if (multiple) {
                    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
                    field.onChange(selected)
                  } else {
                    field.onChange(e.target.value)
                  }
                }}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 disabled:cursor-not-allowed"
              >
                {placeholder && !multiple && (
                  <option value="" style={{ color: '#83838380' }}>
                    {placeholder}
                  </option>
                )}
                {options.map((option, index) => (
                  <option key={`${option.value}-${option.label}-${index}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </FormControl>
          <div className="min-h-[20px]">
            <FormMessage className="text-sm" />
          </div>
        </FormItem>
      )}
    />
  )
}
