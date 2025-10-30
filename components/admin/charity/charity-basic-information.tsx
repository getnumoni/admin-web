"use client";

import { FormCombobox } from "@/components/ui/form-combobox";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormPasswordInput } from "@/components/ui/form-password-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import useGetAllMerchants from "@/hooks/query/useGetAllMerchants";
import { Merchant } from "@/lib/types";
import { X } from "lucide-react";
import React from "react";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";

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
  // Paginated merchants for associated brands selector
  const [merchantPage, setMerchantPage] = React.useState(0);
  const [merchantOptions, setMerchantOptions] = React.useState<{ value: string; label: string }[]>([]);
  const { data: merchantsResp, isPending: isMerchantsPending } = useGetAllMerchants({ page: merchantPage, size: 20 });
  // console.log(merchantsResp?.data?.data?.pageData);
  const pageMerchants: Merchant[] = (merchantsResp?.data?.data?.pageData as Merchant[]) || [];
  const totalMerchantPages = merchantsResp?.data?.data?.totalPages ?? 0;
  const canGoPrev = merchantPage > 0;
  const canGoNext = merchantPage + 1 < totalMerchantPages;

  React.useEffect(() => {
    const nextOptions = pageMerchants.map((m: Merchant) => ({ value: m.userId, label: m.businessName }));
    setMerchantOptions(prev => {
      const existing = new Set(prev.map((o: { value: string; label: string }) => o.value));
      const merged = [...prev];
      nextOptions.forEach((o: { value: string; label: string }) => { if (!existing.has(o.value)) merged.push(o); });
      return merged;
    });
    // Only append when the page index changes to avoid infinite re-renders due to ref changes
  }, [merchantPage]);

  // Watch temp combobox selection to push only the ID to associatedBrands, then clear
  const tempFieldName = "associatedBrandsTemp" as unknown as FieldPath<TFieldValues>;
  const selectedBrandTemp = useWatch({ control, name: tempFieldName });
  React.useEffect(() => {
    if (selectedBrandTemp) {
      onAddBrand(String(selectedBrandTemp));
      // clear the temp field
      setValue("associatedBrandsTemp" as unknown as TName, "");
    }
  }, [selectedBrandTemp, onAddBrand, setValue]);
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

          {/* Merchant selector with pagination using shared FormCombobox */}
          <FormCombobox
            control={control}
            // Temporary field to capture selection and convert to ID via onAddBrand
            name={tempFieldName}
            label="Add Brand/Merchant"
            placeholder={isMerchantsPending ? "Loading merchants..." : "Choose brands/merchants"}
            options={merchantOptions}
            disabled={isMerchantsPending}
            searchPlaceholder="Search merchants..."
            emptyMessage="No merchants found."
            footerSlot={(
              <div className="p-2 sticky bottom-0 bg-white">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={!canGoPrev || isMerchantsPending}
                    onClick={() => setMerchantPage(p => Math.max(p - 1, 0))}
                    className="text-xs px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <div className="text-[10px] text-gray-500 whitespace-nowrap">
                    Page {totalMerchantPages === 0 ? 0 : merchantPage + 1} of {totalMerchantPages}
                  </div>
                  <button
                    type="button"
                    disabled={!canGoNext || isMerchantsPending}
                    onClick={() => setMerchantPage(p => p + 1)}
                    className="text-xs px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
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
      <div className="flex flex-wrap gap-2 mb-2">
        {associatedBrands.map((brandId, index) => {
          const displayName = merchantOptions.find(o => o.value === brandId)?.label || brandId;
          return (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {displayName}
              <button
                type="button"
                onClick={() => onRemoveBrand(brandId)}
                className="ml-1 hover:text-green-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}
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
