"use client";

import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormPhoneInput } from "@/components/ui/form-phone-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface CharityContactInformationProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  regions: string[];
  contactStates: string[];
  contactLgas: string[];
  isRegionsPending?: boolean;
  isContactStatesPending?: boolean;
  isContactLgaPending?: boolean;
}

export default function CharityContactInformation<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  regions,
  contactStates,
  contactLgas,
  isRegionsPending = false,
  isContactStatesPending = false,
  isContactLgaPending = false
}: CharityContactInformationProps<TFieldValues>) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInputTopLabel
          control={control}
          name="contactPersonName"
          label="Contact Person Name"
          placeholder="Enter contact person name"
          required
        />

        <FormInputTopLabel
          control={control}
          name="contactEmail"
          label="Contact Email Address"
          placeholder="Enter email address"
          type="email"
          required
        />

        <FormPhoneInput
          control={control}
          name="contactPhoneNumber"
          label="Contact Phone Number"
          placeholder="8012345678"
          required
        />
      </div>
      <div>



        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FormInputTopLabel
            control={control}
            name="contactAddress"
            label="Contact Address"
            placeholder="Enter contact address"
            required
          />

          <FormSelectTopLabel
            control={control}
            name="contactCountry"
            label="Country"
            placeholder={isRegionsPending ? "Loading regions..." : "Choose a country"}
            disabled={isRegionsPending}
            options={regions.map(region => ({ value: region, label: region }))}
            required
          />

          <FormSelectTopLabel
            control={control}
            name="contactState"
            label="State"
            placeholder={isContactStatesPending ? "Loading states..." : "Select a state"}
            disabled={isContactStatesPending}
            options={contactStates.map(state => ({ value: state, label: state }))}
            required
          />

          <FormSelectTopLabel
            control={control}
            name="contactLga"
            label="LGA"
            placeholder={isContactLgaPending ? "Loading LGAs..." : "Select LGA"}
            disabled={isContactLgaPending}
            options={contactLgas.map(lga => ({ value: lga, label: lga }))}
            required
          />
        </div>


      </div>
    </div>
  );
}
