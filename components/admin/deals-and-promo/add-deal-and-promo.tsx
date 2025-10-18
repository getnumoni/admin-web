'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCreateDeals } from '@/hooks/mutation/useCreateDeals';
import { formatDateForAPI } from '@/lib/helper';
import { DealFormData, dealSchema } from '@/lib/schemas/deal-schema';
import { CreateDealsPayload } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DealsInformation from './deals-information';
import ProductImageSection from './product-image';

export default function AddDealAndPromo() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // Hooks for API calls
  // const { handleUploadDealsFile, isPending: isUploading, isSuccess: isUploadSuccess } = useUploadDealsFile();
  const { handleCreateDeals, isPending: isCreating } = useCreateDeals();

  // Zustand store for uploaded image paths
  // const { uploadedImagePaths, clearImagePaths } = useUploadStore();

  const methods = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      dealsTitle: '',
      brandsMerchants: '',
      dealType: 'Discount',
      dealCategory: [],
      startDate: '',
      endDate: '',
      availableStock: '',
      oldPrice: 0,
      discountPercent: '',
      newPrice: 0,
      qualifyingPurchase: '',
      rewardItemQuantity: '',
      pricePerItem: 0,
      products: [],
      targetLocation: [],
      dealsDescription: '',
      sendNotification: 'yes'
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    watch
  } = methods;

  const onSubmit = async (data: DealFormData) => {
    // Clear previous uploads
    // clearImagePaths();

    // // Step 1: Upload images first if there are any
    // if (uploadedImages.length > 0) {
    //   const formData = new FormData();

    //   // Send each file individually with the same key
    //   uploadedImages.forEach((file) => {
    //     formData.append('file', file);
    //   });

    //   await handleUploadDealsFile(formData);
    // }

    // Step 2: Create the deal payload using image paths from store
    const payload: CreateDealsPayload = {
      brandOrMerchantId: data.brandsMerchants,
      name: data.dealsTitle,
      dealType: data.dealType,
      description: data.dealsDescription,
      availableStock: data.availableStock,
      category: data.dealCategory,
      startDate: formatDateForAPI(data.startDate),
      endDate: formatDateForAPI(data.endDate),
      imagePath: uploadedImages.map(file => ({ imagePath: URL.createObjectURL(file) })),
      active: true
    };

    // Add deal type specific fields
    if (data.dealType === 'Discount') {
      payload.initialPrice = data.oldPrice?.toString();
      payload.discount = data.discountPercent;
      payload.newPrice = data.newPrice?.toString();
    } else if (data.dealType === 'Bundle') {
      payload.qualifyingPurchase = data.qualifyingPurchase;
      payload.rewardItemQuantity = data.rewardItemQuantity;
      payload.pricePerItem = data.pricePerItem?.toString();
    }

    // Step 3: Create the deal
    handleCreateDeals(payload);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto space-y-6">

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Deal Information */}
            <DealsInformation
              control={control}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
            />

            {/* Section 2: Product Images */}
            <ProductImageSection
              onImagesChange={setUploadedImages}
              maxImages={5}
              maxTotalSize={3}
            />

            {/* Section 3: Send push notification */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  Send push notification about this deal
                </h3>
                <RadioGroup
                  value={watch('sendNotification')}
                  onValueChange={(value) => setValue('sendNotification', value as 'yes' | 'no')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <label htmlFor="yes" className="text-sm font-medium text-theme-dark-green">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <label htmlFor="no" className="text-sm font-medium text-theme-dark-green">
                      No
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">

              <Button
                type="submit"
                disabled={isSubmitting || isCreating}
                isLoading={isSubmitting || isCreating}
                loadingText={isCreating ? "Creating Deal..." : "Processing..."}
                className="px-9 py-6 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                Create Deal
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}