"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { useUpdateMerchant } from "@/hooks/mutation/useUpdateMerchant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MerchantDescriptionEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  userId?: string;
}

const descriptionSchema = z.object({
  businessDescription: z.string().min(1, "Description is required"),
});

type DescriptionFormData = z.infer<typeof descriptionSchema>;

export default function MerchantDescriptionEditDialog({
  isOpen,
  onClose,
  description,
  userId,
}: MerchantDescriptionEditDialogProps) {
  const { handleUpdateMerchant, isPending, isSuccess } = useUpdateMerchant();

  const form = useForm<DescriptionFormData>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      businessDescription: description || "",
    },
  });

  const onSubmit = (formData: DescriptionFormData) => {
    console.log('Form submitted with data:', formData);
    if (userId) {
      // Map form data to API payload
      const updatePayload = {
        businessDescription: formData.businessDescription,
        userId: userId,
      };

      handleUpdateMerchant(updatePayload);
    }
  };

  const handleClose = useCallback(() => {
    form.reset();
    onClose();
  }, [form, onClose]);

  // Close dialog only on successful update
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose();
      }
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Merchant Description</DialogTitle>
          </div>
          <DialogDescription>
            Update the merchant&apos;s business description
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="space-y-6">
              <FormTextareaTopLabel
                control={form.control}
                name="businessDescription"
                label="Business Description"
                placeholder="Enter a detailed description of the business..."
                required
                rows={6}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={handleClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
                isLoading={isPending}
                loadingText="Updating..."
              >
                Update Description
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
