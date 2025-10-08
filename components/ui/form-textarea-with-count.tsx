'use client';

import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface FormTextareaWithCountProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function FormTextareaWithCount<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  maxLength = 250,
  disabled = false,
  required = false,
  className,
}: FormTextareaWithCountProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: required ? `${label} is required` : false,
      maxLength: {
        value: maxLength,
        message: `${label} must be less than ${maxLength} characters`
      }
    },
  });

  const currentLength = value?.length || 0;
  const isOverLimit = currentLength > maxLength;

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <textarea
          {...{ value, onChange }}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-base text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error || isOverLimit
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
          )}
        />

        {/* Character Count */}
        <div className="absolute bottom-2 right-2 text-xs">
          <span className={cn(
            isOverLimit ? "text-red-500" : "text-gray-500"
          )}>
            {currentLength}/{maxLength}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}

      {/* Over Limit Warning */}
      {isOverLimit && !error && (
        <p className="text-red-500 text-xs mt-1">
          Description exceeds {maxLength} characters
        </p>
      )}
    </div>
  );
}
