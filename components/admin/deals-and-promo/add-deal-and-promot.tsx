'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DealFormData, dealSchema } from '@/lib/schemas/deal-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DealsInformation from './deals-information';
import ProductImageSection from './product-image';

export default function AddDealAndPromo() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const methods = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      dealsTitle: '',
      brandsMerchants: '',
      dealType: 'Discount',
      dealCategory: '',
      startDate: '',
      endDate: '',
      availableStock: '30',
      oldPrice: '400000',
      discountPercent: '',
      newPrice: '400000',
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
    formState: { errors, isSubmitting },
    watch
  } = methods;

  const onSubmit = (data: DealFormData) => {
    console.log('Form Data:', data);
    console.log('Uploaded Images:', uploadedImages);
    // Handle form submission here
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log('Cancel clicked');
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
                type="button"
                variant="outline"
                onClick={handleCancel}

                className="px-9 py-6 text-theme-dark-green border-theme-dark-green hover:bg-theme-dark-green/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                loadingText="Creating Deal..."
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