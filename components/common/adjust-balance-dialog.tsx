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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface AdjustBalanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { wallet: string; balance: number; reason: string }) => void;
  userName?: string;
  userId?: string;
  isAdjustBalancePending?: boolean;
  isAdjustBalanceSuccess?: boolean;
}

const walletOptions = [
  "Main Wallet",
  "Reward Wallet",
  "Bonus Wallet",
  "Cashback Wallet"
];

export default function AdjustBalanceDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId,
  isAdjustBalancePending,
  isAdjustBalanceSuccess
}: AdjustBalanceDialogProps) {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (selectedWallet && balance && reason) {
      onConfirm({
        wallet: selectedWallet,
        balance: parseFloat(balance),
        reason: reason
      });
    }
  };

  const handleClose = () => {
    setSelectedWallet("");
    setBalance("");
    setReason("");
    onClose();
  };

  React.useEffect(() => {
    if (isAdjustBalanceSuccess) {
      handleClose();
    }
  }, [isAdjustBalanceSuccess, handleClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Adjust Balance</DialogTitle>
            <Button variant="ghost" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              Close
            </Button>
          </div>
          {userName && userId && (
            <DialogDescription>
              Adjusting balance for {userName} ({userId})
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Select Wallet */}
          <div>
            <Label htmlFor="wallet-select">Select Wallet</Label>
            <Select onValueChange={setSelectedWallet} value={selectedWallet}>
              <SelectTrigger id="wallet-select" className="w-full mt-1">
                <SelectValue placeholder="Select a wallet" />
              </SelectTrigger>
              <SelectContent>
                {walletOptions.map((wallet) => (
                  <SelectItem key={wallet} value={wallet}>
                    {wallet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Enter Balance */}
          <div>
            <Label htmlFor="balance-input">Enter Balance (positive or negative)</Label>
            <Input
              id="balance-input"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter balance amount"
              className="mt-1"
            />
          </div>

          {/* Reason for adjustment */}
          <div>
            <Label htmlFor="reason-textarea">Reason for adjustment</Label>
            <Textarea
              id="reason-textarea"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for adjustment"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedWallet || !balance || !reason || isAdjustBalancePending}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
            isLoading={isAdjustBalancePending}
            loadingText="Adjusting balance..."
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
