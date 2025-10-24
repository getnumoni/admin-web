'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  options: MultiSelectOption[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function FormMultiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = "Search and select...",
  options,
  disabled = false,
  required = false,
  className,
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
}: FormMultiSelectProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: required ? `${label} is required` : false },
  });

  const selectedValues: string[] = Array.isArray(value) ? value : [];

  const handleSelect = (selectedValue: string) => {
    if (!selectedValues.includes(selectedValue)) {
      onChange([...selectedValues, selectedValue]);
    }
  };

  // const handleRemove = (valueToRemove: string) => {
  //   onChange(selectedValues.filter(val => val !== valueToRemove));
  // };

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                "w-full justify-between h-12 px-3 py-3 text-left font-normal",
                selectedValues.length === 0 && "text-gray-500",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            >
              {selectedValues.length > 0
                ? `${selectedValues.length} selected`
                : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        className="flex items-center justify-between"
                      >
                        <span className="text-left">{option.label}</span>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
}
