'use client';

import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormPhoneInput } from '@/components/ui/form-phone-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import useGetAllRegions from '@/hooks/query/useGetAllRegions';
import useGetLga from '@/hooks/query/useGetLga';
import useGetStates from '@/hooks/query/useGetStates';
import { MerchantFormData } from '@/lib/schemas/merchant-schema';
import { useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';



interface ContactInformationProps {
  control: Control<MerchantFormData>;
  setValue: UseFormSetValue<MerchantFormData>;
}

export default function ContactInformation({ control, setValue }: ContactInformationProps) {
  // Get regions data
  const { data: regionsData, isPending: regionsPending } = useGetAllRegions();

  // Watch the selected region and state for contact information
  const selectedContactRegion = useWatch({
    control,
    name: "contactRegion"
  });

  const selectedContactState = useWatch({
    control,
    name: "contactState"
  });

  // Get states based on selected contact region
  const { data: statesData, isPending: statesPending } = useGetStates({
    region: selectedContactRegion || ""
  });

  // Get LGAs based on selected contact state
  const { data: lgasData, isPending: lgasPending } = useGetLga({
    state: selectedContactState || ""
  });

  // Map the regions from API response to the expected format
  const regions = regionsData?.data?.data?.map((region: string) => ({
    value: region,
    label: region
  })) || [];

  // Map the states from API response to the expected format
  const states = statesData?.data?.data?.map((state: string) => ({
    value: state,
    label: state
  })) || [];

  // Map the LGAs from API response to the expected format
  const lgas = lgasData?.data?.data?.map((lga: string) => ({
    value: lga,
    label: lga
  })) || [];

  // Reset state and LGA when region changes
  useEffect(() => {
    if (selectedContactRegion) {
      setValue("contactState", "");
      setValue("contactLga", "");
    }
  }, [selectedContactRegion, setValue]);

  // Reset LGA when state changes
  useEffect(() => {
    if (selectedContactState) {
      setValue("contactLga", "");
    }
  }, [selectedContactState, setValue]);

  return (
    <div className="m-6 border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

      {/* First Row - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FormInputTopLabel
          control={control}
          name="contactPersonName"
          label="Contact Person Name"
          placeholder="Shai Hulud"
          required
        />

        <FormInputTopLabel
          control={control}
          name="contactEmailAddress"
          label="Contact Email Address"
          type="email"
          placeholder="shaihulud@gmail.com"
          required
        />

        <FormPhoneInput
          control={control}
          name="contactPhoneNumber"
          label="Contact Phone Number"
          placeholder="7012345678"
          required
        />
      </div>

      {/* Second Row - 4 Columns */}
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
          name="contactRegion"
          label="Region"
          options={regions}
          placeholder={regionsPending ? "Loading regions..." : "Select a region"}
          disabled={regionsPending}
          required
        />

        <FormSelectTopLabel
          control={control}
          name="contactState"
          label="State"
          options={states}
          placeholder={!selectedContactRegion ? "Select Region First" : statesPending ? "Loading states..." : "Select a state"}
          disabled={!selectedContactRegion || statesPending}
          required
        />

        <FormSelectTopLabel
          control={control}
          name="contactLga"
          label="LGA"
          options={lgas}
          placeholder={!selectedContactState ? "Select State First" : lgasPending ? "Loading LGAs..." : "Select an LGA"}
          disabled={!selectedContactState || lgasPending}
          required
        />
      </div>
    </div>
  );
}
