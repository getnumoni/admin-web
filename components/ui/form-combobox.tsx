"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { Control, FieldPath, FieldValues, useController } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ComboboxOption {
  value: string
  label: string
}

interface FormComboboxProps<
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
  className?: string
  searchPlaceholder?: string
  emptyMessage?: string
  footerSlot?: React.ReactNode
  onSearch?: (searchValue: string) => void
  isSearching?: boolean
}

export function FormCombobox<
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
  className = "",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  footerSlot,
  onSearch,
  isSearching: externalIsSearching = false,
}: FormComboboxProps<TFieldValues, TName>) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("")
  const [internalIsSearching, setInternalIsSearching] = React.useState(false)

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: required ? `${label} is required` : false },
  })

  const selectedOption = options.find((option) => option.value === field.value)

  // Use external isSearching if provided, otherwise use internal
  const isSearching = externalIsSearching !== undefined ? externalIsSearching : internalIsSearching;

  // Debounce search value to improve performance
  React.useEffect(() => {
    if (searchValue !== debouncedSearchValue) {
      if (!externalIsSearching && onSearch) {
        setInternalIsSearching(true);
      }
    }

    const timer = setTimeout(() => {
      const previousValue = debouncedSearchValue;
      setDebouncedSearchValue(searchValue);
      if (!externalIsSearching && onSearch) {
        setInternalIsSearching(false);
      }
      // Call onSearch callback for server-side search when value changes
      if (onSearch && searchValue !== previousValue) {
        onSearch(searchValue);
      }
    }, 300); // 300ms delay for API calls

    return () => clearTimeout(timer);
  }, [searchValue, debouncedSearchValue, onSearch, externalIsSearching]);

  // Filter options based on debounced search value (only if no server-side search)
  const filteredOptions = React.useMemo(() => {
    // If onSearch is provided, don't filter client-side (server handles it)
    if (onSearch) return options;

    if (!debouncedSearchValue.trim()) return options;

    const searchLower = debouncedSearchValue.toLowerCase().trim();
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchLower) ||
      option.value.toLowerCase().includes(searchLower)
    );
  }, [options, debouncedSearchValue, onSearch]);

  // Clear search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearchValue("");
      setDebouncedSearchValue("");
      if (!externalIsSearching) {
        setInternalIsSearching(false);
      }
      // Reset search on server-side when popover closes
      if (onSearch) {
        onSearch("");
      }
    }
  }, [open, onSearch, externalIsSearching]);

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between h-12 px-3 py-3 text-left font-normal shadow-none",
              !selectedOption && "text-gray-500",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9"
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList className="max-h-[200px] overflow-y-auto">
              {isSearching ? (
                <div className="px-2 py-4 text-center text-sm text-gray-500">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-theme-dark-green rounded-full animate-spin"></div>
                    Searching...
                  </div>
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.slice(0, 50).map((option, index) => (
                      <CommandItem
                        key={`${option.value}-${index}`}
                        value={option.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue === field.value ? "" : currentValue)
                          setOpen(false)
                          setSearchValue("") // Clear search when selecting
                          // Reset server-side search when selecting
                          if (onSearch) {
                            onSearch("")
                          }
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                    {filteredOptions.length > 50 && (
                      <div className="px-2 py-1 text-xs text-gray-500 text-center">
                        Showing first 50 results. Refine your search for more specific results.
                      </div>
                    )}
                  </CommandGroup>
                  {footerSlot && (
                    <div className="border-t border-gray-100">
                      {footerSlot}
                    </div>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  )
}
