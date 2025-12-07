'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { FormTextareaTopLabel } from '@/components/ui/form-textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUpdateSponsoredDeal } from '@/hooks/mutation/useUpdateSponsoredDeal';
import { useUploadDealsFile } from '@/hooks/mutation/useUploadDealsFile';
import useGetDealList from '@/hooks/query/useGetDealList';
import { SponsoredDealFormData, sponsoredDealSchema } from '@/lib/schemas/sponsored-deal-schema';
import { DealData } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SponsorDeal } from './sponsored-deal-columns';
import SponsoredDealImageUpload from './sponsored-deal-image-upload';

interface UpdateSponsoredDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deal: SponsorDeal | null;
  isLoading?: boolean;
}

export default function UpdateSponsoredDealDialog({
  isOpen,
  onClose,
  deal,
  isLoading = false,
}: UpdateSponsoredDealDialogProps) {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Hooks for API calls
  const { handleUploadDealsFile, isPending: isUploading } = useUploadDealsFile();
  const { handleUpdateSponsoredDeal, isPending: isUpdating, isSuccess } = useUpdateSponsoredDeal();

  // Close dialog on successful update
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  // Fetch deals for dropdown
  const { data: dealsData } = useGetDealList({ size: 1000 });
  const apiResponse = dealsData?.data?.data;
  const deals = (apiResponse?.pageData as DealData[] | undefined) || [];

  // Transform deals for dropdown
  const dealOptions = deals.map((deal) => ({
    value: deal.id,
    label: `${deal.name} - ${deal.merchantName}`,
  }));

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
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form when deal changes
  useEffect(() => {
    if (deal && isOpen) {
      reset({
        heading: deal.heading || '',
        description: deal.description || '',
        dealId: deal.dealId || '',
        isActive: deal.isActive ?? true,
      });
      setCurrentImageUrl(deal.backgroundImage || null);
      setBackgroundImage(null);
    }
  }, [deal, isOpen, reset]);

  const onSubmit = async (data: SponsoredDealFormData) => {
    if (!deal) return;

    let imageUrl = currentImageUrl || '';

    // If a new image was uploaded, upload it first
    if (backgroundImage) {
      const formData = new FormData();
      formData.append('file', backgroundImage);
      const uploadedImageUrl = await handleUploadDealsFile(formData);

      if (!uploadedImageUrl) {
        // Handle upload error
        return;
      }
      imageUrl = uploadedImageUrl;
    }

    // Update sponsored deal payload
    const payload = {
      id: deal.id,
      heading: data.heading,
      description: data.description,
      dealId: data.dealId,
      backgroundImage: imageUrl,
      isActive: data.isActive,
    };

    // Update the sponsored deal
    handleUpdateSponsoredDeal(payload);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isUpdating && !isUploading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-3xl max-h-[90vh] flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 shrink-0">
          <DialogTitle>Update Sponsored Deal</DialogTitle>
          <DialogDescription>
            Update the details of the sponsored deal below.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Form {...methods}>
            <form id="update-sponsored-deal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      options={dealOptions}
                      placeholder="Select a deal"
                      required
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
                initialImageUrl={currentImageUrl}
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
                      <RadioGroupItem value="true" id="active-update" />
                      <label htmlFor="active-update" className="text-sm font-medium text-theme-dark-green">
                        Active
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="inactive-update" />
                      <label htmlFor="inactive-update" className="text-sm font-medium text-theme-dark-green">
                        Inactive
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting || isUpdating || isUploading}
            className="px-9 py-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="update-sponsored-deal-form"
            disabled={isSubmitting || isUpdating || isUploading}
            isLoading={isSubmitting || isUpdating || isUploading}
            loadingText={isUploading ? "Uploading Image..." : isUpdating ? "Updating Sponsored Deal..." : "Processing..."}
            className="px-9 py-6 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            Update Sponsored Deal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

