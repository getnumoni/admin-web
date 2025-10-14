"use client";

import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormPasswordInput } from "@/components/ui/form-password-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { X } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface CharityBasicInformationProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  setValue: (name: TName, value: string | string[] | undefined) => void;
  regions: string[];
  states: string[];
  lgas: string[];
  associatedBrands: string[];
  onAddBrand: (brand: string) => void;
  onRemoveBrand: (brand: string) => void;
  isRegionsPending?: boolean;
  isStatesPending?: boolean;
  isLgaPending?: boolean;
}

export default function CharityBasicInformation<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  setValue,
  regions,
  states,
  lgas,
  associatedBrands,
  onAddBrand,
  onRemoveBrand,
  isRegionsPending = false,
  isStatesPending = false,
  isLgaPending = false
}: CharityBasicInformationProps<TFieldValues, TName>) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputTopLabel
          control={control}
          name="charityName"
          label="Charity Name"
          placeholder="Enter charity name"
          required
        />

        <FormInputTopLabel
          control={control}
          name="charityRegNumber"
          label="Charity Reg Number"
          placeholder="Enter registration number"
          required
        />
      </div>



      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FormInputTopLabel
          control={control}
          name="charityAddress"
          label="Charity Address"
          placeholder="Enter charity address"
          required
        />

        <FormSelectTopLabel
          control={control}
          name="region"
          label="Region"
          placeholder={isRegionsPending ? "Loading regions..." : "Choose a region"}
          disabled={isRegionsPending}
          options={regions.map(region => ({ value: region, label: region }))}
          required
        />

        <FormSelectTopLabel
          control={control}
          name="state"
          label="State"
          placeholder={isStatesPending ? "Loading states..." : "Select a state"}
          disabled={isStatesPending}
          options={states.map(state => ({ value: state, label: state }))}
          required
        />

        <FormSelectTopLabel
          control={control}
          name="lga"
          label="LGA"
          placeholder={isLgaPending ? "Loading LGAs..." : "Select LGA"}
          disabled={isLgaPending}
          options={lgas.map(lga => ({ value: lga, label: lga }))}
          required
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Associated Brands/Merchants
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {associatedBrands.map((brand, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {brand}
                <button
                  type="button"
                  onClick={() => onRemoveBrand(brand)}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Choose brands/merchants"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-dark-green focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAddBrand(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>

        <FormPasswordInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter password"
          required
        />

        <FormPasswordInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          required
        />
      </div>



      <div className="md:col-span-2">
        <FormTextareaTopLabel
          control={control}
          name="description"
          label="Charity Description"
          placeholder="Tell us about your charity organization"
          rows={4}
          required
        />
      </div>
    </div>
  );
}
