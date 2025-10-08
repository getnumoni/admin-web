"use client"

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './form'

interface FormPasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

export function FormPasswordInput({
  control,
  name,
  label,
  disabled,
  required,
  placeholder = "Enter your password",
}: FormPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
              <input
                {...field}
                id={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-lg border pr-12 pl-4 py-3 text-base text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed ${error
                  ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500'
                  }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
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