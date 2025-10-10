"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ResetPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { newPassword: string; confirmPassword: string }) => void;
  userName?: string;
  userId?: string;
}

export default function ResetPasswordDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirm = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      onConfirm({
        newPassword,
        confirmPassword
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
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
              Resetting password for {userName} ({userId})
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Enter New Password */}
          <div>
            <Label htmlFor="new-password">Enter New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1"
            />
            {passwordsMismatch && (
              <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
            )}
            {passwordsMatch && (
              <p className="text-sm text-green-600 mt-1">Passwords match</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!newPassword || !confirmPassword || !passwordsMatch}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
          >
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
