'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormCalendarInput } from '@/components/ui/form-calendar-input';
import { FormCombobox } from '@/components/ui/form-combobox';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormMultiSelect } from '@/components/ui/form-multi-select';
import { FormTextareaWithCount } from '@/components/ui/form-textarea-with-count';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import { categoryOptions } from '@/lib/schemas/deal-schema';
import { DealData, Merchant } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Edit deal form schema
const editDealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  branch: z.string().min(1, 'Branch is required'),
  category: z.array(z.string()).min(1, 'At least one category must be selected'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required').max(250, 'Description must be less than 250 characters'),
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: brandsMerchants } = useGetAllMerchants();
  const brandsMerchantsData = brandsMerchants?.data?.data?.pageData;

  // Transform merchants data for combobox
  const merchantOptions = brandsMerchantsData?.map((merchant: Merchant) => ({
    value: merchant.id,
    label: merchant.businessName,
  })) || [];

  const methods = useForm<EditDealFormData>({
    resolver: zodResolver(editDealSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      branch: '',
      category: [],
      startDate: '',
      endDate: '',
      description: '',
    }
  });

  const { control, handleSubmit, reset, watch } = methods;
  const watchedCategory = watch('category');

  // Helper function to convert DD-MM-YYYY to YYYY-MM-DD
  const convertDateFormat = (dateStr: string): string => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  // Reset form when deal changes
  useEffect(() => {
    if (deal && isOpen) {
      reset({
        title: deal.name || '',
        branch: deal.merchantName || '',
        category: deal.category || [],
        startDate: convertDateFormat(deal.startDate || ''),
        endDate: convertDateFormat(deal.endDate || ''),
        description: deal.description || '',
      });
    }
  }, [deal, isOpen, reset]);

  // Helper function to convert YYYY-MM-DD to DD-MM-YYYY
  const convertToAPIFormat = (dateStr: string): string => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const onSubmit = async (data: EditDealFormData) => {
    setIsSubmitting(true);
    try {
      // Convert dates back to DD-MM-YYYY format for API
      const formattedData = {
        ...data,
        startDate: convertToAPIFormat(data.startDate),
        endDate: convertToAPIFormat(data.endDate),
      };
      await onSave(formattedData);
      onClose();
    } catch (error) {
      console.error('Error saving deal:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <hr />
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Main Form Grid */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Deal Title */}
                <FormInputTopLabel
                  control={control}
                  name="title"
                  label="Deals Title"
                  placeholder="E.g 10% off all purchase"
                  required
                />

                {/* Branch/Merchant */}
                <FormCombobox
                  control={control}
                  name="branch"
                  label="Brands/Merchants"
                  placeholder="Choose brands/merchants"
                  options={merchantOptions}
                  required
                  searchPlaceholder="Search merchants..."
                  emptyMessage="No merchants found."
                />

              </div>

              {/* Deal Category */}
              <div>
                {/* Deal Category */}
                <FormMultiSelect
                  control={control}
                  name="category"
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
            </div>

            {/* Date Fields */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="md:col-span-2">
              <FormTextareaWithCount
                control={control}
                name="description"
                label="Deals Description"
                placeholder="Detailed Description of the deal"
                rows={4}
                maxLength={250}
                required
              />
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting || isLoading}
                className="px-8 py-3 border-green-600 text-green-600 hover:bg-green-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                isLoading={isSubmitting || isLoading}
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
