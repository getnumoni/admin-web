'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateAdmin } from '@/hooks/mutation/useCreateAdmin';
import { adminSchema, type AdminFormData } from '@/lib/schemas/admin-schema';
import { CreateAdminPayload } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProfileUploadSection from '../add-merchants/profile-upload-section';
import BasicInformation from './basic-information';

export default function AddAdmin() {

  const { handleCreateAdmin, isPending } = useCreateAdmin();

  const form = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      profileImage: '',
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      roleType: '',
      department: '',
      password: '',
      confirmPassword: '',
      notifyByEmail: false
    }
  });

  const { control, handleSubmit, setValue, watch } = form;

  const handleImageChange = (imageUrl: string | null) => {
    setValue('profileImage', imageUrl || '');
  };

  const onSubmit = async (data: AdminFormData) => {
    const payload: CreateAdminPayload = {
      name: data.fullName,
      email: data.emailAddress,
      phone: data.phoneNumber,
      loginAccess: true,
      roleName: data.roleType,
      department: data.department,
      password: data.password,
    }

    handleCreateAdmin(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100">
        {/* Profile Picture Section */}
        <ProfileUploadSection
          onImageChange={handleImageChange}
          imageUrl={watch('profileImage')}
        />

        {/* Basic Information Section */}
        <BasicInformation
          control={control}
          setValue={setValue}
        />

        {/* Submit Button */}
        <div className="p-6 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            isLoading={isPending}
            loadingText="Creating Admin..."
          >
            Create User
          </Button>
        </div>
      </form>
    </Form>
  );
}