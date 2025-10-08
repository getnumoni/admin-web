'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateMerchants } from '@/hooks/mutation/useCreateMerchants';
import { useGeneratePayOnUsToken } from '@/hooks/mutation/useGeneratePayOnUsToken';
import useGeneratePayOnUsBankList from '@/hooks/query/useGeneratePayOnUsBankList';
import { formatPhoneWithPlus234 } from '@/lib/phone-utils';
import { merchantSchema, type MerchantFormData } from '@/lib/schemas/merchant-schema';
import { CreateMerchantsPayload } from '@/lib/types';
import { useUserAuthStore } from '@/stores/user-auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import BusinessInformation from "./business-information";
import ContactInformation from "./contact-information";
import PayoutInformation from "./payout-information";
import ProfileUploadSection from "./profile-upload-section";

export default function AddMerchants() {
  const { user } = useUserAuthStore();

  const { handleGeneratePayOnUsToken } = useGeneratePayOnUsToken();
  const hasGeneratedPayOnUsToken = useRef(false);

  const { handleCreateMerchants, isPending } = useCreateMerchants();
  const { data: payOnUsBankList } = useGeneratePayOnUsBankList();


  // const { handleGenerateBankToken } = useGenerateBankToken();
  // const hasGeneratedToken = useRef(false);

  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    mode: 'onChange', // Enable real-time validation
    reValidateMode: 'onChange', // Re-validate on change
    defaultValues: {
      businessName: '',
      emailAddress: '',
      phoneNumber: '',
      businessCategory: [],
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
  // useEffect(() => {
  //   if (!hasGeneratedToken.current) {
  //     handleGenerateBankToken();
  //     hasGeneratedToken.current = true;
  //   }
  // }, [handleGenerateBankToken]);

  useEffect(() => {
    if (!hasGeneratedPayOnUsToken.current) {
      handleGeneratePayOnUsToken();
      hasGeneratedPayOnUsToken.current = true;
    }
  }, [handleGeneratePayOnUsToken]);

  const handleImageChange = (imageUrl: string | null) => {
    setValue('profileImage', imageUrl || '');
  };

  const onSubmit = async (data: MerchantFormData) => {
    // console.log('Form submitted with data:', data);
    // console.log('Form errors:', form.formState.errors);
    // console.log('Form is valid:', form.formState.isValid);

    // Get bank name from bank code using the actual API data
    const getBankNameFromCode = (bankCode: string) => {
      const bankData = payOnUsBankList?.data?.data || payOnUsBankList?.data;
      if (bankData && typeof bankData === 'object') {
        return bankData[bankCode] || bankCode;
      }
      return bankCode;
    };

    const payload: CreateMerchantsPayload = {
      businessImgPath: data.profileImage || '',
      businessName: data.businessName,
      emailAddress: data.emailAddress,
      phoneNumber: formatPhoneWithPlus234(data.phoneNumber),
      businessCategory: data.businessCategory,
      rcNumber: data.rcNumber,
      userId: user?.id || '',
      businessType: data.businessType,
      headquartersAddress: data.headquarterAddress,
      region: data.region,
      state: data.state,
      lga: data.lga,
      businessDescription: data.businessDescription,
      password: data.password,
      confirmPassword: data.confirmPassword,
      contactPersonName: data.contactPersonName,
      contactEmailAddress: data.contactEmailAddress,
      contactPhoneNumber: formatPhoneWithPlus234(data.contactPhoneNumber),
      contactAddress: data.contactAddress,
      contactRegion: data.contactRegion,
      contactState: data.contactState,
      contactIga: data.contactLga,
      bankName: getBankNameFromCode(data.bankCode),
      bankAccountNumber: data.bankAccountNumber,
      accountHolderName: data.verifiedAccountName || ''
    };

    // console.log('Merchant Form Payload:', payload);
    // console.log('User ID:', user?.id);
    // console.log('Bank Code:', data.bankCode);
    // console.log('Bank Name:', getBankNameFromCode(data.bankCode));
    handleCreateMerchants(payload);

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
        <div className="p-6 flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isPending}
            loadingText="Creating Merchant..."
          >
            Create Merchant
          </Button>
        </div>
      </form>
    </Form>
  );
}