'use client';

import { Form } from '@/components/ui/form';
import { useGenerateBankToken } from '@/hooks/mutation/useGenerateBankToken';
import { merchantSchema, type MerchantFormData } from '@/lib/schemas/merchant-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import BusinessInformation from "./business-information";
import ContactInformation from "./contact-information";
import PayoutInformation from "./payout-information";
import ProfileUploadSection from "./profile-upload-section";

export default function AddMerchants() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleGenerateBankToken } = useGenerateBankToken();
  const hasGeneratedToken = useRef(false);

  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    defaultValues: {
      businessName: '',
      emailAddress: '',
      phoneNumber: '',
      businessCategory: '',
      rcNumber: '',
      businessType: '',
      headquarterAddress: '',
      country: '',
      region: '',
      state: '',
      lga: '',
      businessDescription: '',
      password: '',
      confirmPassword: '',
      contactPersonName: '',
      contactEmailAddress: '',
      contactPhoneNumber: '',
      contactAddress: '',
      contactRegion: '',
      contactState: '',
      contactLga: '',
      bankName: '',
      bankCode: '',
      bankAccountNumber: '',
      accountName: '',
      verifiedAccountName: ''
    }
  });

  const { control, handleSubmit, setValue, watch } = form;

  // Generate bank token when component mounts (only once)
  useEffect(() => {
    if (!hasGeneratedToken.current) {
      handleGenerateBankToken();
      hasGeneratedToken.current = true;
    }
  }, [handleGenerateBankToken]);

  const handleImageChange = (imageUrl: string | null) => {
    setValue('profileImage', imageUrl || '');
  };

  const onSubmit = async (data: MerchantFormData) => {
    setIsSubmitting(true);

    try {
      // Log the payload to console
      console.log('Merchant Form Payload:', data);

      // Here you would typically send the data to your API
      // await createMerchant(data);

      alert('Merchant created successfully!');

    } catch (error: unknown) {
      console.error('Error creating merchant:', error);
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

        {/* Business Information Section */}
        <BusinessInformation
          control={control}
          setValue={setValue}
        />

        {/* Contact Information Section */}
        <ContactInformation
          control={control}
          setValue={setValue}
        />

        {/* Payout Information Section */}
        <PayoutInformation
          control={control}
          setValue={setValue}
        />

        {/* Submit Button */}
        <div className="p-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Merchant...' : 'Create Merchant'}
          </button>
        </div>
      </form>
    </Form>
  );
}