'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from './form';

interface FormPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  customErrorMessage?: string;
}

export function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  className,
  customErrorMessage
}: FormPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${className || ''}`}>
          <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#838383]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <FormControl>
            <div className="relative">
              <input
                {...field}
                id={name}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-base text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </FormControl>
          <div className="min-h-[20px]">
            {customErrorMessage ? (
              <p className="text-sm text-red-500">{customErrorMessage}</p>
            ) : (
              <FormMessage className="text-sm" />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
