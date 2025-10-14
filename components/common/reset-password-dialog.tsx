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
import { FormPasswordInput } from "@/components/ui/form-password-input";
import { useForm } from "react-hook-form";

interface ResetPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { newPassword: string; confirmPassword: string }) => void;
  userName?: string;
  userId?: string;
  isLoading?: boolean;
}

export default function ResetPasswordDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId,
  isLoading = false
}: ResetPasswordDialogProps) {
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  });

  const newPassword = form.watch("newPassword");
  const confirmPassword = form.watch("confirmPassword");

  const handleConfirm = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      onConfirm({
        newPassword,
        confirmPassword
      });
      // Don't close immediately - let the parent handle closing on success
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsMismatch = newPassword && confirmPassword && newPassword !== confirmPassword;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Reset Password</DialogTitle>
            <Button variant="ghost" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              Close
            </Button>
          </div>
          {userName && userId && (
            <DialogDescription>
              Resetting password for {userName}
            </DialogDescription>
          )}
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-6">
            {/* Enter New Password */}
            <FormPasswordInput
              control={form.control}
              name="newPassword"
              label="Enter New Password"
              placeholder="Enter new password"
              required
            />

            {/* Confirm New Password */}
            <div>
              <FormPasswordInput
                control={form.control}
                name="confirmPassword"
                label="Confirm New Password"
                placeholder="Confirm new password"
                required
              />
              {passwordsMismatch && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="text-sm text-green-600 mt-1">Passwords match</p>
              )}
            </div>
          </div>
        </Form>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!newPassword || !confirmPassword || !passwordsMatch || isLoading}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
            isLoading={isLoading}
            loadingText="Resetting..."
          >
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
