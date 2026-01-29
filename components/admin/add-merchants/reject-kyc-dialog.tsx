"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rejectKycSchema = z.object({
  reason: z.string().min(1, "Rejection reason is required").min(10, "Reason must be at least 10 characters"),
});

type RejectKycFormData = z.infer<typeof rejectKycSchema>;

interface RejectKycDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  documentType: string;
  documentName: string;
  isLoading?: boolean;
}

export default function RejectKycDialog({
  isOpen,
  onClose,
  onConfirm,
  documentType: _documentType,
  documentName,
  isLoading = false,
}: Readonly<RejectKycDialogProps>) {
  const form = useForm<RejectKycFormData>({
    resolver: zodResolver(rejectKycSchema),
    defaultValues: {
      reason: "",
    },
  });

  const handleSubmit = (data: RejectKycFormData) => {
    onConfirm(data.reason);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reject KYC Document</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting the {documentName}. This reason will be recorded and may be shared with the merchant.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormTextareaTopLabel
              control={form.control}
              name="reason"
              label="Rejection Reason"
              placeholder="Enter the reason for rejecting this document..."
              required
              rows={5}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Rejecting..."
              >
                Reject Document
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

