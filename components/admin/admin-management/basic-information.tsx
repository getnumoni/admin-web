'use client';

import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormPasswordInput } from '@/components/ui/form-password-input';
import { FormPhoneInput } from '@/components/ui/form-phone-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useGetAllRoles from '@/hooks/query/useGetAllRoles';
import { AdminFormData } from '@/lib/schemas/admin-schema';
import { Control, UseFormSetValue } from 'react-hook-form';

interface BasicInformationProps {
  control: Control<AdminFormData>;
  setValue: UseFormSetValue<AdminFormData>;
  isEditMode?: boolean;
}

export default function BasicInformation({ control, setValue, isEditMode = false }: BasicInformationProps) {
  const { data: rolesData, isPending: rolesPending } = useGetAllRoles();

  // Map API roles to the expected format
  const roleTypeOptions = rolesData?.data?.roles?.map((role: { id: string; name: string }) => ({
    value: role.name,
    label: role.name
  })) || [];

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

      {/* Middle Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormSelectTopLabel
          control={control}
          name="roleType"
          label="Role Type"
          options={roleTypeOptions}
          placeholder={rolesPending ? "Loading roles..." : "Choose a role type"}
          required
          disabled={rolesPending || isEditMode}
        />

        <FormInputTopLabel
          control={control}
          name="department"
          label="Department"
          placeholder="Enter department"
        />
      </div>

      {/* Password Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

      {/* Notification Preference */}
      <div className="mt-8 flex md:flex-row gap-6 items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Do you want us to notify them about their new account at the email provided?
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
