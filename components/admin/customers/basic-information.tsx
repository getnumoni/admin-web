'use client';

import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormPhoneInput } from '@/components/ui/form-phone-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useGetAllRegions from '@/hooks/query/useGetAllRegions';
import useGetLga from '@/hooks/query/useGetLga';
import useGetStates from '@/hooks/query/useGetStates';
import { CustomerFormData, genders, languages } from '@/lib/schemas/customer-schema';
import { useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

interface BasicInformationProps {
  control: Control<CustomerFormData>;
  setValue: UseFormSetValue<CustomerFormData>;
}

export default function BasicInformation({ control, setValue }: BasicInformationProps) {
  // Get regions data
  const { data: regionsData, isPending: regionsPending } = useGetAllRegions();

  // Watch the selected region and state
  const selectedRegion = useWatch({
    control,
    name: "region"
  });

  const selectedState = useWatch({
    control,
    name: "state"
  });

  // Get states based on selected region
  const { data: statesData, isPending: statesPending } = useGetStates({
    region: selectedRegion || ""
  });

  // Get LGAs based on selected state
  const { data: lgasData, isPending: lgasPending } = useGetLga({
    state: selectedState || ""
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

  // Map genders to the expected format
  const genderOptions = genders.map((gender) => ({
    value: gender,
    label: gender
  }));

  // Map languages to the expected format
  const languageOptions = languages.map((language) => ({
    value: language,
    label: language
  }));

  // Reset state and LGA when region changes
  useEffect(() => {
    if (selectedRegion) {
      setValue("state", "");
      setValue("lga", "");
    }
  }, [selectedRegion, setValue]);

  // Reset LGA when state changes
  useEffect(() => {
    if (selectedState) {
      setValue("lga", "");
    }
  }, [selectedState, setValue]);
  return (
    <div className="m-6 border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

      {/* Top Section - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FormInputTopLabel
          control={control}
          name="fullName"
          label="Full Name"
          placeholder="Shai Hulud"
          required
        />

        <FormInputTopLabel
          control={control}
          name="emailAddress"
          label="Email Address"
          type="email"
          placeholder="shaihulud@gmail.com"
          required
        />

        <FormPhoneInput
          control={control}
          name="phoneNumber"
          label="Phone Number"
          placeholder="7012345678"
          required
        />
      </div>

      {/* Middle Section - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FormInputTopLabel
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          required
        />

        <FormSelectTopLabel
          control={control}
          name="gender"
          label="Gender"
          options={genderOptions}
          placeholder="Select gender"
          required
        />

        <FormSelectTopLabel
          control={control}
          name="preferredLanguage"
          label="Preferred Language"
          options={languageOptions}
          placeholder="Select language"
          required
        />
      </div>

      {/* Address Section */}
      <div className="mb-6">
        <FormInputTopLabel
          control={control}
          name="address"
          label="Address"
          placeholder="Enter your address"
          required
        />

        {/* Region, State, LGA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <FormSelectTopLabel
            control={control}
            name="region"
            label="Region"
            options={regions}
            placeholder={regionsPending ? "Loading regions..." : "Select a region"}
            disabled={regionsPending}
            required
          />

          <FormSelectTopLabel
            control={control}
            name="state"
            label="State"
            options={states}
            placeholder={!selectedRegion ? "Select Region First" : statesPending ? "Loading states..." : "Select a state"}
            disabled={!selectedRegion || statesPending}
            required
          />

          <FormSelectTopLabel
            control={control}
            name="lga"
            label="LGA"
            options={lgas}
            placeholder={!selectedState ? "Select State First" : lgasPending ? "Loading LGAs..." : "Select an LGA"}
            disabled={!selectedState || lgasPending}
            required
          />
        </div>
      </div>

      {/* Password Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormInputTopLabel
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          required
        />

        <FormInputTopLabel
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          required
        />
      </div>

      {/* Notification Preference */}
      <div className="mt-8 flex md:flex-row gap-6 items-center">
        <h3 className="text-lg font-medium text-gray-900 ">
          Do you want to notify them about their new account at the email provided?
        </h3>
        <RadioGroup
          onValueChange={(value) => setValue('notifyByEmail', value === 'yes')}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <label htmlFor="yes" className="text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <label htmlFor="no" className="text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
