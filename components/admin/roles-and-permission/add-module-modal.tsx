import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { useCreateModule } from "@/hooks/mutation/useCreateModule";
import { CreateModulePayload } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const moduleFormSchema = z.object({
  moduleName: z.string().min(1, "Module name is required").min(2, "Module name must be at least 2 characters"),
  moduleDescription: z.string().min(1, "Module description is required").min(10, "Module description must be at least 10 characters"),
});

type ModuleFormData = z.infer<typeof moduleFormSchema>;

export default function AddModuleModal({ isOpen, onClose }: AddModuleModalProps) {

  const { handleCreateModule, isPending, isSuccess } = useCreateModule();
  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      moduleName: "",
      moduleDescription: "",
    },
  });

  const onSubmit = (data: ModuleFormData) => {
    const payload: CreateModulePayload = {
      moduleName: data.moduleName,
      description: data.moduleDescription,
    };
    handleCreateModule(payload);
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
          <DialogTitle>Add New Module</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormInputTopLabel
                control={form.control}
                name="moduleName"
                label="Module Name"
                placeholder="Enter module name"
                required
              />

              <FormTextareaTopLabel
                control={form.control}
                name="moduleDescription"
                label="Module Description"
                placeholder="Enter module description"
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
                Add Module
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}