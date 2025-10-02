'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { customerSchema, type CustomerFormData } from '@/lib/schemas/customer-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProfileUploadSection from '../add-merchants/profile-upload-section';
import BasicInformation from './basic-information';

export default function AddCustomers() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      // Log the payload to console
      console.log('Customer Form Payload:', data);

      // Here you would typically send the data to your API
      // await createCustomer(data);

      alert('Customer created successfully!');

    } catch (error: unknown) {
      console.error('Error creating customer:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isSubmitting}
            loadingText="Creating Customer..."
          >
            Create Customer
          </Button>
        </div>
      </form>
    </Form>
  );
}