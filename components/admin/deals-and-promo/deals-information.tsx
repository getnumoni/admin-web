'use client';

import { FormCalendarInput } from '@/components/ui/form-calendar-input';
import { FormCombobox } from '@/components/ui/form-combobox';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormMultiSelect } from '@/components/ui/form-multi-select';
import { FormNumberInput } from '@/components/ui/form-number-input';
import { FormSelectTopLabel } from '@/components/ui/form-select';
import { FormTextareaWithCount } from '@/components/ui/form-textarea-with-count';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import { calculateNewPrice } from '@/lib/helper';
import { categoryOptions, DealFormData, dealTypeOptions } from '@/lib/schemas/deal-schema';
import { Merchant } from '@/lib/types';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger, useWatch } from 'react-hook-form';

interface DealsInformationProps {
  control: Control<DealFormData>;
  setValue: UseFormSetValue<DealFormData>;
  trigger: UseFormTrigger<DealFormData>;
  errors: FieldErrors<DealFormData>;
}

export default function DealsInformation({ control, setValue, trigger }: DealsInformationProps) {
  // Watch form values for multi-select fields
  // const watchedProducts = useWatch({ control, name: 'products' });
  // const watchedLocations = useWatch({ control, name: 'targetLocation' });
  const watchedDealCategory = useWatch({ control, name: 'dealCategory' });

  // Watch price fields for calculation
  const watchedOldPrice = useWatch({ control, name: 'oldPrice' });
  const watchedDiscountPercent = useWatch({ control, name: 'discountPercent' });
  const watchedNewPrice = useWatch({ control, name: 'newPrice' });

  // Watch bundle fields for validation
  const watchedQualifyingPurchase = useWatch({ control, name: 'qualifyingPurchase' });
  const watchedRewardItemQuantity = useWatch({ control, name: 'rewardItemQuantity' });
  const watchedPricePerItem = useWatch({ control, name: 'pricePerItem' });

  // Watch deal type for conditional rendering
  const watchedDealType = useWatch({ control, name: 'dealType' });

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

  const { data: brandsMerchants } = useGetAllMerchants();

  const brandsMerchantsData = brandsMerchants?.data?.data?.pageData;

  // Transform merchants data for combobox
  const merchantOptions = brandsMerchantsData?.map((merchant: Merchant) => ({
    value: merchant.id,
    label: merchant.businessName,
  })) || [];

  // Update new price when old price or discount changes
  React.useEffect(() => {
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

  return (
    <div className="bg-white rounded-xl  p-6">
      <div className='border border-gray-200 rounded-xl p-6'>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Deal</h2>


        {/* Deals Title */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 ">
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



        <div className=" grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {/* Deal Category */}

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



          {/* Start Date */}
          <FormCalendarInput
            control={control}
            name="startDate"
            label="Start Date"
            placeholder="Select start date"
            required
          />

          {/* End Date */}
          <FormCalendarInput
            control={control}
            name="endDate"
            label="End Date"
            placeholder="Select end date"
            required
          />

          {/* Available Stock */}
          <FormInputTopLabel
            control={control}
            name="availableStock"
            label="Available Stock"
            type="number"
            required
          />


        </div>

        {/* Selected Categories Display */}
        {watchedDealCategory && watchedDealCategory.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {watchedDealCategory.map((category) => {
              const option = categoryOptions.find(opt => opt.value === category);
              return (
                <div
                  key={category}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full px-3 py-1 text-xs"
                >
                  <span>{option?.label || category}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newCategories = watchedDealCategory.filter(cat => cat !== category);
                      setValue('dealCategory', newCategories);
                    }}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Conditional Fields Based on Deal Type */}
        {watchedDealType === 'Discount' && (
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* Old Price */}
            <FormNumberInput
              control={control}
              name="oldPrice"
              label="Old Price"
              placeholder="E.g 40,000"
              required
              setValue={setValue}
            />
            {/* Discount % */}
            <FormInputTopLabel
              control={control}
              name="discountPercent"
              label="Discount %"
              placeholder="E.g 10%"
              required
            />

            {/* New Price */}
            <FormNumberInput
              control={control}
              name="newPrice"
              label="New Price (Calculated)"
              placeholder="Calculated automatically"
              disabled
              required
              setValue={setValue}
            />
          </div>
        )}

        {watchedDealType === 'Bundle' && (
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* Qualifying Purchase */}
            <FormInputTopLabel
              control={control}
              name="qualifyingPurchase"
              label="Qualifying Purchase"
              placeholder="E.g Buy 2"
              required
            />

            {/* Reward Item/Quantity */}
            <FormInputTopLabel
              control={control}
              name="rewardItemQuantity"
              label="Reward Item/Quantity"
              placeholder="E.g Get 1 Free Or Get Free Bag"
              required
            />

            {/* Price Per Item */}
            <FormNumberInput
              control={control}
              name="pricePerItem"
              label="Price Per Item"
              placeholder="E.g 40,000"
              required
              setValue={setValue}
            />
          </div>
        )}

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Products
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-2">
              <div className="border border-gray-200 rounded-lg p-3 min-h-[48px]">
                <div className="flex flex-wrap gap-2">
                  {watchedProducts.map((product) => {
                    const option = productOptions.find(opt => opt.value === product);
                    return (
                      <span
                        key={product}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs"
                      >
                        {option?.label || product}
                        <button
                          type="button"
                          onClick={() => {
                            const newProducts = watchedProducts.filter(p => p !== product);
                            setValue('products', newProducts);
                          }}
                          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    onClick={() => {
                      // Simple dropdown simulation - in real app, use proper dropdown
                      const availableOptions = productOptions.filter(opt => !watchedProducts.includes(opt.value));
                      if (availableOptions.length > 0) {
                        setValue('products', [...watchedProducts, availableOptions[0].value]);
                      }
                    }}
                  >
                    + Add Product
                  </button>
                </div>
              </div>
              {errors.products && (
                <p className="text-red-500 text-xs mt-1">{errors.products.message}</p>
              )}
            </div>
          </div> */}

          {/* Target Location */}
          {/* <div className="">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Target Location
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-lg p-3 min-h-[48px]">
                  <div className="flex flex-wrap gap-2">
                    {watchedLocations.map((location) => {
                      const option = locationOptions.find(opt => opt.value === location);
                      return (
                        <span
                          key={location}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs"
                        >
                          {option?.label || location}
                          <button
                            type="button"
                            onClick={() => {
                              const newLocations = watchedLocations.filter(l => l !== location);
                              setValue('targetLocation', newLocations);
                            }}
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                      onClick={() => {
                        // Simple dropdown simulation - in real app, use proper dropdown
                        const availableOptions = locationOptions.filter(opt => !watchedLocations.includes(opt.value));
                        if (availableOptions.length > 0) {
                          setValue('targetLocation', [...watchedLocations, availableOptions[0].value]);
                        }
                      }}
                    >
                      + Add Location
                    </button>
                  </div>
                </div>
                {errors.targetLocation && (
                  <p className="text-red-500 text-xs mt-1">{errors.targetLocation.message}</p>
                )}
              </div>
            </div>
          </div> */}
        </div>



        {/* Deals Description */}
        <div className="md:col-span-2">
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

  );
}
