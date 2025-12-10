'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UpdateDealStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: string) => void;
  dealName: string;
  currentStatus: string;
  approveStatus?: string | null;
  isLoading?: boolean;
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'HIDDEN', label: 'Hidden' },
  { value: 'ACTIVE', label: 'Active' },
];

export default function UpdateDealStatusDialog({
  isOpen,
  onClose,
  onConfirm,
  dealName,
  currentStatus,
  approveStatus,
  isLoading = false,
}: UpdateDealStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus || '');

  // Update selected status when dialog opens or currentStatus changes
  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(currentStatus || '');
      // Check if deal is approved when dialog opens
      if (approveStatus !== "APPROVED") {
        onClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentStatus, approveStatus]);

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
      setSelectedStatus(currentStatus || '');
    }
  };

  const handleConfirm = () => {
    // Double check approval status before confirming
    if (approveStatus !== "APPROVED") {
      return;
    }
    if (selectedStatus) {
      onConfirm(selectedStatus);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-theme-dark-green/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-theme-dark-green" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Update Deal Status
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Update the status for <span className="font-semibold">{dealName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Deal Status <span className="text-red-500">*</span>
            </label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus} disabled={isLoading}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedStatus && (
              <p className="text-xs text-gray-500 mt-1">Status selection is required</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || !selectedStatus}
            className="w-full sm:w-auto bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
            isLoading={isLoading}
            loadingText="Updating..."
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

