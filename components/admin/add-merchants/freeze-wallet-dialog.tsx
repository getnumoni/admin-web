"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface FreezeWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  userName: string;
  userId: string;
}

const freezeReasons = [
  "Fraudulent Activities",
  "Suspicious Transactions",
  "Policy Violation",
  "Account Security Breach",
  "Manual Review Required",
  "Other"
];

export default function FreezeWalletDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId
}: FreezeWalletDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
      onClose();
      setSelectedReason("");
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Freeze Wallet
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              Freezing this wallet will immediately block all point transactions for this user.
              They will not be able to earn, spend, or transfer points until the wallet is unfrozen.
              Do you want to proceed?
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">User:</span> {userName} ({userId})
            </p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select Reason for Freezing
            </label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a reason..." />
              </SelectTrigger>
              <SelectContent>
                {freezeReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedReason}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Freeze
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
