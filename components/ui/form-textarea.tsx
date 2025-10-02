"use client"

import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './form'

interface FormTextareaTopLabelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export function FormTextareaTopLabel({
  control,
  name,
  label,
  disabled,
  required,
  placeholder,
  rows = 4,
  resize = 'vertical',
}: FormTextareaTopLabelProps) {
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
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              style={{ resize }}
              className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed ${resize === 'none' ? 'resize-none' :
                resize === 'vertical' ? 'resize-y' :
                  resize === 'horizontal' ? 'resize-x' : 'resize'
                }`}
            />
          </FormControl>
          <div className="min-h-[20px]">
            <FormMessage className="text-sm" />
          </div>
        </FormItem>
      )}
    />
  )
}
