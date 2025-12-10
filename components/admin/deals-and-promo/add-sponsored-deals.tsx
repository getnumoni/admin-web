'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { FormTextareaTopLabel } from '@/components/ui/form-textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCreateSponsoredDeal } from '@/hooks/mutation/useCreateSponsoredDeal';
import { useUploadDealsFile } from '@/hooks/mutation/useUploadDealsFile';
import useGetDealFilterList from '@/hooks/query/useGetDealFilterList';
import { SponsoredDealFormData, sponsoredDealSchema } from '@/lib/schemas/sponsored-deal-schema';
import { DealData } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SponsoredDealImageUpload from './sponsored-deal-image-upload';

export default function AddSponsoredDeals() {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  // Hooks for API calls
  const { handleUploadDealsFile, isPending: isUploading } = useUploadDealsFile();
  const { handleCreateSponsoredDeal, isPending: isCreating } = useCreateSponsoredDeal();

  const { data: dealFilterList } = useGetDealFilterList({ dealName: '' });

  // console.log(dealFilterList?.data?.data);

  const deals = dealFilterList?.data?.data?.map((deal: DealData) => ({
    value: deal.id,
    label: `${deal.name} - ${deal.merchantName}`,
  })) || [];

  const methods = useForm<SponsoredDealFormData>({
    resolver: zodResolver(sponsoredDealSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      heading: '',
      description: '',
      dealId: '',
      isActive: true,
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SponsoredDealFormData) => {
    if (!backgroundImage) {
      // You might want to show an error toast here
      return;
    }

    // Upload background image
    const formData = new FormData();
    formData.append('file', backgroundImage);
    const uploadedImageUrl = await handleUploadDealsFile(formData);

    if (!uploadedImageUrl) {
      // Handle upload error
      return;
    }

    // Create sponsored deal payload
    const payload = {
      heading: data.heading,
      description: data.description,
      dealId: data.dealId,
      backgroundImage: uploadedImageUrl,
      isActive: data.isActive,
    };

    // Create the sponsored deal
    handleCreateSponsoredDeal(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto space-y-6">
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Sponsored Deal Information */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sponsored Deal Information</h2>

              <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Heading */}
                  <FormInputTopLabel
                    control={control}
                    name="heading"
                    label="Heading"
                    placeholder="Enter sponsored deal heading"
                    required
                  />

                  {/* Deal Selection */}
                  <FormSelectTopLabel
                    control={control}
                    name="dealId"
                    label="Select Deal"
                    options={deals}
                    placeholder="Select a deal"
                  />
                </div>

                {/* Description */}
                <FormTextareaTopLabel
                  control={control}
                  name="description"
                  label="Description"
                  placeholder="Enter sponsored deal description"
                  rows={4}
                  required
                />


              </div>
            </div>

            {/* Section 2: Background Image */}
            <SponsoredDealImageUpload
              onImageChange={setBackgroundImage}
              maxSize={5}
            />

            {/* Section 3: Active Status */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Status Settings</h2>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  Is this sponsored deal active?
                </h3>
                <RadioGroup
                  value={watch('isActive') ? 'true' : 'false'}
                  onValueChange={(value) => setValue('isActive', value === 'true')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="active" />
                    <label htmlFor="active" className="text-sm font-medium text-theme-dark-green">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="inactive" />
                    <label htmlFor="inactive" className="text-sm font-medium text-theme-dark-green">
                      Inactive
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting || isCreating || isUploading || !backgroundImage}
                isLoading={isSubmitting || isCreating || isUploading}
                loadingText={isUploading ? "Uploading Image..." : isCreating ? "Creating Sponsored Deal..." : "Processing..."}
                className="px-9 py-6 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                Create Sponsored Deal
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
