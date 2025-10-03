'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateCustomers } from '@/hooks/mutation/useCreateCustomers';
import { customerSchema, type CustomerFormData } from '@/lib/schemas/customer-schema';
import { CreateCustomersPayload } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProfileUploadSection from '../add-merchants/profile-upload-section';
import BasicInformation from './basic-information';

export default function AddCustomers() {
  const { handleCreateCustomers, isPending } = useCreateCustomers();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      profileImage: '',
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      preferredLanguage: '',
      address: '',
      region: '',
      state: '',
      lga: '',
      postalCode: '',
      password: '',
      confirmPassword: '',
      notifyByEmail: false
    }
  });

  const { control, handleSubmit, setValue, watch } = form;

  const handleImageChange = (imageUrl: string | null) => {
    setValue('profileImage', imageUrl || '');
  };

  const onSubmit = async (data: CustomerFormData) => {
    const payload: CreateCustomersPayload = {
      fullName: data.fullName,
      email: data.emailAddress,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      notifyByEmail: data.notifyByEmail ?? false,
      password: data.password,
      preferredLanguage: data.preferredLanguage,
      address: data.address,
      lga: data.lga,
      state: data.state,
      region: data.region,
      postalCode: data.postalCode
    };

    handleCreateCustomers(payload);

  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100">
        {/* Profile Picture Section */}
        <ProfileUploadSection
          onImageChange={handleImageChange}
          imageUrl={watch('profileImage')}
        />

        {/* Basic Information Section */}
        <BasicInformation
          control={control}
          setValue={setValue}
        />

        {/* Submit Button */}
        <div className="p-6 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isPending}
            loadingText="Creating Customer..."
          >
            Create Customer
          </Button>
        </div>
      </form>
    </Form>
  );
}