'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useState } from 'react';

interface RejectDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rejectionReason: string) => void;
  dealName: string;
  isLoading?: boolean;
}

export default function RejectDealDialog({
  isOpen,
  onClose,
  onConfirm,
  dealName,
  isLoading = false,
}: RejectDealDialogProps) {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
      setRejectionReason('');
    }
  };

  const handleConfirm = () => {
    if (!rejectionReason.trim()) {
      return; // Don't allow empty rejection reason
    }
    onConfirm(rejectionReason);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <X className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Reject Deal
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Are you sure you want to reject <span className="font-semibold">{dealName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="rejectionReason"
              placeholder="Please provide a reason for rejecting this deal..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="w-full"
              disabled={isLoading}
              required
            />
            {!rejectionReason.trim() && (
              <p className="text-xs text-gray-500 mt-1">Rejection reason is required</p>
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
            disabled={isLoading || !rejectionReason.trim()}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
            isLoading={isLoading}
            loadingText="Rejecting..."
          >
            Reject Deal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

