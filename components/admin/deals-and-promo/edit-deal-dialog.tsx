'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormCalendarInput } from '@/components/ui/form-calendar-input';
import { FormCombobox } from '@/components/ui/form-combobox';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormMultiSelect } from '@/components/ui/form-multi-select';
import { FormNumberInput } from '@/components/ui/form-number-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { FormTextareaWithCount } from '@/components/ui/form-textarea-with-count';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import { calculateNewPrice, convertDateFormat } from '@/lib/helper';
import { categoryOptions, dealTypeOptions } from '@/lib/schemas/deal-schema';
import { DealData, Merchant } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Edit deal form schema - using same comprehensive schema as create
const editDealSchema = z.object({
  dealsTitle: z.string().min(1, 'Deals title is required').max(100, 'Title must be less than 100 characters'),
  brandsMerchants: z.string().min(1, 'Brand/Merchant selection is required'),
  dealType: z.string().min(1, 'Deal type is required'),
  dealCategory: z.array(z.string()).min(1, 'At least one deal category must be selected'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  availableStock: z.string().min(1, 'Available stock is required').regex(/^\d+$/, 'Stock must be a number'),

  // Discount-specific fields
  oldPrice: z.number().optional(),
  discountPercent: z.string().optional(),
  newPrice: z.number().optional(),

  // Bundle-specific fields
  qualifyingPurchase: z.string().optional(),
  rewardItemQuantity: z.string().optional(),
  pricePerItem: z.number().optional(),

  products: z.array(z.string()).optional(),
  targetLocation: z.array(z.string()).optional(),
  dealsDescription: z.string().min(1, 'Deal description is required').max(250, 'Description must be less than 250 characters'),
  sendNotification: z.enum(['yes', 'no']),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate > startDate;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type EditDealFormData = z.infer<typeof editDealSchema>;

interface EditDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deal: DealData | null;
  onSave: (data: EditDealFormData) => void;
  isLoading?: boolean;
}

export default function EditDealDialog({
  isOpen,
  onClose,
  deal,
  onSave,
  isLoading = false
}: EditDealDialogProps) {

  const { data: brandsMerchants } = useGetAllMerchants({ size: 1000 });
  const brandsMerchantsData = brandsMerchants?.data?.data?.pageData;

  // Transform merchants data for combobox
  const merchantOptionsFromAPI = brandsMerchantsData?.map((merchant: Merchant) => ({
    value: merchant.userId,
    label: merchant.businessName,
  })) || [];

  // Find the specific merchant for the current deal
  const currentMerchant = deal?.merchantName
    ? brandsMerchantsData?.find((merchant: Merchant) =>
      merchant.businessName === deal.merchantName
    )
    : null;

  // Create merchant options with temporary option for deal's merchant if not found in API response yet
  const merchantOptions = useMemo(() => {
    if (!deal?.merchantName) return merchantOptionsFromAPI;

    // Check if merchant is already in the options
    const merchantExists = merchantOptionsFromAPI.some(
      (option: { value: string; label: string }) => option.label === deal.merchantName
    );

    // If merchant exists, return options as is
    if (merchantExists) return merchantOptionsFromAPI;

    // If merchant not found yet and we have merchantName, add temporary option
    // Use merchantName as both value and label temporarily
    return [
      {
        value: deal.merchantName, // Temporary value until API loads
        label: deal.merchantName,
      },
      ...merchantOptionsFromAPI,
    ];
  }, [merchantOptionsFromAPI, deal?.merchantName]);

  const methods = useForm<EditDealFormData>({
    resolver: zodResolver(editDealSchema),
    mode: 'onChange',
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

  const { control, handleSubmit, reset, watch, setValue, trigger } = methods;
  const watchedCategory = watch('dealCategory');
  const watchedDealType = watch('dealType');
  const watchedOldPrice = watch('oldPrice');
  const watchedDiscountPercent = watch('discountPercent');
  const watchedNewPrice = watch('newPrice');
  const watchedQualifyingPurchase = watch('qualifyingPurchase');
  const watchedRewardItemQuantity = watch('rewardItemQuantity');
  const watchedPricePerItem = watch('pricePerItem');


  // Trigger validation when discount fields change
  useEffect(() => {
    if (watchedDealType === 'Discount') {
      trigger(['oldPrice', 'discountPercent', 'newPrice']);
    }
  }, [watchedOldPrice, watchedDiscountPercent, watchedNewPrice, watchedDealType, trigger]);

  // Trigger validation when bundle fields change
  useEffect(() => {
    if (watchedDealType === 'Bundle') {
      trigger(['qualifyingPurchase', 'rewardItemQuantity', 'pricePerItem']);
    }
  }, [watchedQualifyingPurchase, watchedRewardItemQuantity, watchedPricePerItem, watchedDealType, trigger]);

  // Update new price when old price or discount changes
  useEffect(() => {
    if (watchedOldPrice && watchedDiscountPercent) {
      // Convert old price to string for calculation function
      const oldPriceStr = watchedOldPrice.toString();
      const newPrice = calculateNewPrice(oldPriceStr, watchedDiscountPercent);

      if (newPrice) {
        // Set the calculated value as number for validation
        setValue('newPrice', parseFloat(newPrice));
      }
    }
  }, [watchedOldPrice, watchedDiscountPercent, setValue]);

  // Reset form when deal changes - set merchant name immediately
  useEffect(() => {
    if (deal && isOpen) {
      // Use merchantName as initial value if merchant not found yet, otherwise use userId
      const merchantValue = currentMerchant?.userId || deal.merchantName || '';

      const formData = {
        dealsTitle: deal.name || '',
        brandsMerchants: merchantValue,
        dealType: deal.dealType || 'Discount',
        dealCategory: deal.category || [],
        startDate: convertDateFormat(deal.startDate || ''),
        endDate: convertDateFormat(deal.endDate || ''),
        availableStock: deal.availableStock || '',
        oldPrice: deal.initialPrice ? parseFloat(deal.initialPrice) : 0,
        discountPercent: deal.discount || '',
        newPrice: deal.newPrice ? parseFloat(deal.newPrice) : 0,
        qualifyingPurchase: deal.qualifyingPurchase || '',
        rewardItemQuantity: deal.rewardItemQuantity || '',
        pricePerItem: deal.pricePerItem ? parseFloat(deal.pricePerItem) : 0,
        products: [],
        targetLocation: [],
        dealsDescription: deal.description || '',
        sendNotification: 'yes' as const
      };
      reset(formData);
    }
  }, [deal, isOpen, reset]);

  // Update merchant value when currentMerchant is found
  useEffect(() => {
    if (deal && isOpen && currentMerchant?.userId && deal.merchantName) {
      const currentValue = watch('brandsMerchants');
      // If current value is the merchant name (temporary), update to userId
      if (currentValue === deal.merchantName) {
        setValue('brandsMerchants', currentMerchant.userId);
      }
    }
  }, [currentMerchant, deal, isOpen, setValue, watch]);

  // Helper function to convert YYYY-MM-DD to DD-MM-YYYY
  const convertToAPIFormat = (dateStr: string): string => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const onSubmit = async (data: EditDealFormData) => {

    const formattedData = {
      ...data,
      startDate: convertToAPIFormat(data.startDate),
      endDate: convertToAPIFormat(data.endDate),
    };
    await onSave(formattedData);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-semibold text-gray-900">Edit Deal Information</DialogTitle>
          <DialogDescription className="text-gray-600">
            Update the deal details below. All fields marked with * are required.
          </DialogDescription>
          <hr />
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Deal Information */}
            <div className="bg-white rounded-xl p-6">
              <div className='border border-gray-200 rounded-xl p-6'>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Deal Information</h2>

                {/* Deals Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInputTopLabel
                    control={control}
                    name="dealsTitle"
                    label="Deals Title"
                    placeholder="E.g 10% off all purchase"
                    required
                  />

                  {/* Brands/Merchants */}
                  <FormCombobox
                    control={control}
                    name="brandsMerchants"
                    label="Brands/Merchants"
                    placeholder="Choose brands/merchants"
                    options={merchantOptions}
                    required
                    searchPlaceholder="Search merchants..."
                    emptyMessage="No merchants found."
                  />

                  {/* Deal Type */}
                  <FormSelectTopLabel
                    control={control}
                    name="dealType"
                    label="Deal Type"
                    placeholder="Select deal type"
                    options={dealTypeOptions}
                    required
                  />
                </div>

                {/* Deal Category */}
                <div className="mt-6">
                  <FormMultiSelect
                    control={control}
                    name="dealCategory"
                    label="Deal Category"
                    options={categoryOptions}
                    placeholder="Search and select categories..."
                    searchPlaceholder="Search categories..."
                    emptyMessage="No categories found."
                    required
                  />

                  {/* Selected Categories Display */}
                  {watchedCategory && watchedCategory.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {watchedCategory.map((category) => {
                        const option = categoryOptions.find(opt => opt.value === category);
                        return (
                          <div
                            key={category}
                            className="inline-flex items-center gap-1 bg-green-50 text-green-800 border border-green-200 rounded-full px-3 py-1 text-xs"
                          >
                            <span>{option?.label || category}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Available Stock */}
                <div className="mt-6">
                  <FormInputTopLabel
                    control={control}
                    name="availableStock"
                    label="Available Stock"
                    placeholder="Enter available stock"
                    required
                  />
                </div>

                {/* Conditional Fields based on Deal Type */}
                {watchedDealType === 'Discount' && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormNumberInput
                      control={control}
                      name="oldPrice"
                      label="Old Price"
                      placeholder="Enter old price"
                      setValue={setValue}
                    />
                    <FormInputTopLabel
                      control={control}
                      name="discountPercent"
                      label="Discount Percentage"
                      placeholder="e.g., 25%"
                    />
                    <FormNumberInput
                      control={control}
                      name="newPrice"
                      label="New Price"
                      placeholder="Enter new price"
                      setValue={setValue}
                    />
                  </div>
                )}

                {watchedDealType === 'Bundle' && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormInputTopLabel
                      control={control}
                      name="qualifyingPurchase"
                      label="Qualifying Purchase"
                      placeholder="Enter qualifying purchase"
                    />
                    <FormInputTopLabel
                      control={control}
                      name="rewardItemQuantity"
                      label="Reward Item Quantity"
                      placeholder="Enter reward item quantity"
                    />
                    <FormNumberInput
                      control={control}
                      name="pricePerItem"
                      label="Price Per Item"
                      placeholder="Enter price per item"
                      setValue={setValue}
                    />
                  </div>
                )}

                {/* Date Fields */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormCalendarInput
                    control={control}
                    name="startDate"
                    label="Start Date"
                    placeholder="DD/MM/YY"
                    required
                  />

                  <FormCalendarInput
                    control={control}
                    name="endDate"
                    label="End Date"
                    placeholder="DD/MM/YY"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mt-6">
                  <FormTextareaWithCount
                    control={control}
                    name="dealsDescription"
                    label="Deals Description"
                    placeholder="Detailed Description of the deal"
                    rows={4}
                    maxLength={250}
                    required
                  />
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="px-8 py-3 border-green-600 text-green-600 hover:bg-green-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Updating..."
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent >
    </Dialog >
  );
}
