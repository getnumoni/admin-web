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
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormMultiSelect } from "@/components/ui/form-multi-select";
import { useUpdateMerchant } from "@/hooks/mutation/useUpdateMerchant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// interface BankInformation {
//   id: string;
//   bankname: string;
//   bankcode: string | null;
//   accountNo: string;
//   accountHolderName: string;
//   bankTransferCode: string | null;
//   primary: boolean;
//   minimumSpentAmount: number;
//   active: boolean;
//   createdDt: string | null;
//   updatedDt: string | null;

// }

interface PersonalInformationEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  category: string[];
  businessEmail: string;
  address: string;
  businessPhoneNo: string;
  userId?: string;
}

const personalInformationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessEmail: z.string().email("Invalid email address"),
  businessPhoneNo: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  businessCategory: z.array(z.string()).optional(),
});

type PersonalInformationFormData = z.infer<typeof personalInformationSchema>;

const businessCategoryOptions = [
  { value: "Retail", label: "Retail" },
  { value: "Food & Beverage", label: "Food & Beverage" },
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Finance", label: "Finance" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Electronics", label: "Electronics" },
  { value: "Fashion", label: "Fashion" },
  { value: "Automotive", label: "Automotive" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Other", label: "Other" },
];

export default function PersonalInformationEditDialog({
  isOpen,
  onClose,
  businessName,
  category,
  businessEmail,
  address,
  businessPhoneNo,
  userId
}: PersonalInformationEditDialogProps) {
  const { handleUpdateMerchant, isPending, isSuccess } = useUpdateMerchant();

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      businessName: businessName || "",
      businessEmail: businessEmail || "",
      businessPhoneNo: businessPhoneNo || "",
      address: address || "",
      businessCategory: category || [],
    },
  });

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = form.getValues();

    if (userId) {
      // Map form data to API payload
      const updatePayload = {
        businessName: formData.businessName,
        emailAddress: formData.businessEmail,
        phoneNumber: formData.businessPhoneNo,
        headquartersAddress: formData.address,
        businessCategory: formData.businessCategory || [],
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Personal Information</DialogTitle>

          </div>
          <DialogDescription>
            Update the merchant&apos;s personal and business information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleConfirm} noValidate>
            <div className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Business Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputTopLabel
                    control={form.control}
                    name="businessName"
                    label="Business Name"
                    placeholder="Enter business name"
                    required
                  />

                  <FormInputTopLabel
                    control={form.control}
                    name="businessEmail"
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />

                  <FormInputTopLabel
                    control={form.control}
                    name="businessPhoneNo"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    required
                  />

                  <FormInputTopLabel
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter business address"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Business Categories</h4>
                <FormMultiSelect
                  control={form.control}
                  name="businessCategory"
                  label="Business Category"
                  options={businessCategoryOptions}
                  placeholder="Search and select categories..."
                  searchPlaceholder="Search categories..."
                  emptyMessage="No categories found."
                />
              </div>
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
                Update Information
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
