"use client"

import { NigeriaIcon } from '@/constant/icons'
import Image from 'next/image'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './form'

interface FormPhoneInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

export function FormPhoneInput({
  control,
  name,
  label,
  disabled,
  required,
  placeholder = "08012345678",
}: FormPhoneInputProps) {
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
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Image
                  src={NigeriaIcon}
                  alt="Nigeria Flag"
                  width={16}
                  height={12}
                  className="w-4 h-3"
                />
                <span className="text-sm text-gray-700">+234</span>
                <div className="w-px h-4 bg-gray-300 ml-1"></div>
              </div>
              <input
                {...field}
                id={name}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                maxLength={10}
                onKeyDown={(e) => {
                  // Prevent typing 0 as the first character
                  if (e.key === '0' && field.value === '') {
                    e.preventDefault();
                  }
                  // Only allow numbers
                  if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  // Remove any non-numeric characters
                  const numericValue = value.replace(/\D/g, '');
                  // Ensure it doesn't start with 0 and is max 10 digits
                  if (numericValue.length <= 10 && !numericValue.startsWith('0')) {
                    field.onChange(numericValue);
                  }
                }}
                className={`w-full rounded-lg border pl-20 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${error
                  ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500'
                  }`}
              />
            </div>
          </FormControl>
          <div className="min-h-[20px]">
            <FormMessage className="text-sm text-red-600" />
          </div>
        </FormItem>
      )}
    />
  )
}
