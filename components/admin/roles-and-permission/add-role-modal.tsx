import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { useCreateRole } from "@/hooks/mutation/useCreateRole";
import { CreateRolePayload } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleFormSchema = z.object({
  roleName: z.string().min(1, "Role name is required").min(2, "Role name must be at least 2 characters"),
  roleDescription: z.string().min(1, "Role description is required").min(10, "Role description must be at least 10 characters"),
});

type RoleFormData = z.infer<typeof roleFormSchema>;

export default function AddRoleModal({ isOpen, onClose }: AddRoleModalProps) {
  const { handleCreateRole, isPending, isSuccess } = useCreateRole();
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: "",
      roleDescription: "",
    },
  });

  const onSubmit = (data: RoleFormData) => {
    const payload: CreateRolePayload = {
      name: data.roleName,
      description: data.roleDescription,
    };
    handleCreateRole(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormInputTopLabel
                control={form.control}
                name="roleName"
                label="Role Name"
                placeholder="Enter role name"
                required
              />

              <FormTextareaTopLabel
                control={form.control}
                name="roleDescription"
                label="Role Description"
                placeholder="Enter role description"
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-theme-dark-green text-white px-6"
                disabled={isPending}
                isLoading={isPending}
                loadingText="Adding..."
              >
                Add Role
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}