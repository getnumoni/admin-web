"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateMerchantSettlementType } from "@/hooks/mutation/useUpdateMerchantSettlementType";
import { useEffect, useState } from "react";

interface UpdateMerchantSettlementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  currentSettlementType?: string;
}

const settlementOptions = [
  { label: "Daily", value: "daily" },
  { label: "Instant", value: "instant" },
];

export function UpdateMerchantSettlementDialog({
  isOpen,
  onClose,
  merchantId,
  currentSettlementType,
}: Readonly<UpdateMerchantSettlementDialogProps>) {
  const [selectedType, setSelectedType] = useState(currentSettlementType?.toLowerCase() || "");
  const { handleUpdateMerchantSettlementType, isPending, isSuccess } = useUpdateMerchantSettlementType();

  useEffect(() => {
    if (currentSettlementType) {
      setSelectedType(currentSettlementType.toLowerCase());
    }
  }, [currentSettlementType]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleConfirm = () => {
    if (selectedType && merchantId) {
      handleUpdateMerchantSettlementType({
        merchantId,
        settlementType: selectedType,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Update Merchant Settlement</DialogTitle>

          </div>
          <DialogDescription>
            Select the settlement type for this merchant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="settlement-select" className="my-2">Settlement Type</Label>
            <Select onValueChange={setSelectedType} value={selectedType}>
              <SelectTrigger id="settlement-select" className="w-full mt-1">
                <SelectValue placeholder="Select settlement type" />
              </SelectTrigger>
              <SelectContent>
                {settlementOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedType || isPending}
              className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
              isLoading={isPending}
              loadingText="Updating..."
            >
              Update Settlement
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}