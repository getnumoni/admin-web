import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { useCreateTicketType } from "@/hooks/mutation/useCreateTicketType";
import { CreateTicketTypePayload } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddTicketTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ticketTypeFormSchema = z.object({
  ticketTypeName: z.string().min(1, "Ticket type name is required").min(2, "Ticket type name must be at least 2 characters"),
  ticketUserType: z.string().min(1, "Ticket user type is required"),
});

type TicketTypeFormData = z.infer<typeof ticketTypeFormSchema>;

export default function AddTicketTypeModal({ isOpen, onClose }: AddTicketTypeModalProps) {

  const { handleCreateTicketType, isPending, isSuccess } = useCreateTicketType();

  const form = useForm<TicketTypeFormData>({
    resolver: zodResolver(ticketTypeFormSchema),
    defaultValues: {
      ticketTypeName: "",
      ticketUserType: "",
    },
  });

  const onSubmit = (data: TicketTypeFormData) => {

    const payload: CreateTicketTypePayload = {
      name: data.ticketTypeName,
      userType: data.ticketUserType,
    };
    handleCreateTicketType(payload);
  };

  React.useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Ticket Type</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormInputTopLabel
                control={form.control}
                name="ticketTypeName"
                label="Ticket Type Name"
                placeholder="Enter ticket type name"
                required
              />

              <FormSelectTopLabel
                control={form.control}
                name="ticketUserType"
                label="Ticket User Type"
                placeholder="Type a ticket user type"
                required
                options={[
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                  { value: "superadmin", label: "Super Admin" },
                ]}
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
                loadingText="Saving Ticket Type..."
              >
                Add Ticket Type
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}