'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormInputTopLabel } from '@/components/ui/form-input';
import { FormPhoneInput } from '@/components/ui/form-phone-input';
import { useUpdateAdmin } from '@/hooks/mutation/useUpdateAdmin';
import { CreateAdminPayload } from '@/lib/types';
import { Admin } from '@/lib/types/admin';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: Admin | null;
}

interface EditFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
}

export default function EditAdminModal({ isOpen, onClose, admin }: EditAdminModalProps) {

  const { handleUpdateAdmin, isPending, isSuccess } = useUpdateAdmin();



  const form = useForm<EditFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: ''
    }
  });

  const { control, handleSubmit, reset } = form;

  // Pre-populate form when admin data is available
  useEffect(() => {
    if (admin && isOpen) {
      reset({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        department: admin.department || ''
      });
    }
  }, [admin, isOpen, reset]);

  const onSubmit = async (data: EditFormData) => {
    const payload: CreateAdminPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      roleName: admin?.roleName,
      position: admin?.position,
      shift: admin?.shift,
      loginAccess: admin?.loginAccess,

    };
    handleUpdateAdmin(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Edit Admin Details
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInputTopLabel
                  control={control}
                  name="name"
                  label="Full Name"
                  placeholder="Enter full name"
                  required
                />

                <FormInputTopLabel
                  control={control}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  disabled
                  required
                />

                <FormPhoneInput
                  control={control}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  required
                />

                <FormInputTopLabel
                  control={control}
                  name="department"
                  label="Department"
                  placeholder="Enter department"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  disabled={isPending}
                  isLoading={isPending}
                  loadingText="Updating Admin..."
                >
                  Update Admin
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}