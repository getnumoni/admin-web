"use client"

import { Control, FieldPath, FieldValues } from "react-hook-form"
import { FormCombobox } from "./form-combobox"

interface ComboboxOption {
  value: string
  label: string
}

interface FormComboboxTopLabelProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  placeholder?: string
  options: ComboboxOption[]
  disabled?: boolean
  required?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  isLoading?: boolean
  onSearch?: (searchValue: string) => void
  isSearching?: boolean
}

export function FormComboboxTopLabel<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = "Select option...",
  options,
  disabled = false,
  required = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  isLoading = false,
  onSearch,
  isSearching = false,
}: FormComboboxTopLabelProps<TFieldValues, TName>) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#838383]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center justify-center h-12 px-3 py-3 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-theme-dark-green rounded-full animate-spin"></div>
            Loading deals...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#838383]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <FormCombobox
        control={control}
        name={name}
        label=""
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        required={required}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        className="space-y-0"
        onSearch={onSearch}
        isSearching={isSearching}
      />
    </div>
  );
}

