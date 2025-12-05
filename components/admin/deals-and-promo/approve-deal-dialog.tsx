'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface ApproveDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (adminComments: string) => void;
  dealName: string;
  isLoading?: boolean;
}

export default function ApproveDealDialog({
  isOpen,
  onClose,
  onConfirm,
  dealName,
  isLoading = false,
}: ApproveDealDialogProps) {
  const [adminComments, setAdminComments] = useState('');

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
      setAdminComments('');
    }
  };

  const handleConfirm = () => {
    onConfirm(adminComments);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Approve Deal
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Are you sure you want to approve <span className="font-semibold">{dealName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="adminComments" className="block text-sm font-medium text-gray-700 mb-2">
              Approval Comments <span className="text-gray-400">(Optional)</span>
            </label>
            <Textarea
              id="adminComments"
              placeholder="Add comments about why this deal is being approved..."
              value={adminComments}
              onChange={(e) => setAdminComments(e.target.value)}
              rows={4}
              className="w-full"
              disabled={isLoading}
            />
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
            disabled={isLoading}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            isLoading={isLoading}
            loadingText="Approving..."
          >
            Approve Deal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

