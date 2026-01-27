import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type MakeMerchantInternalDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (isInternal: boolean) => void;
  merchantName: string;
  isLoading?: boolean;
  isInternal: boolean;
  email: string;
  userType: "MERCHANT" | "CUSTOMER" | "CHARITY";
}

export function MakeMerchantInternalDialog({ isOpen, onClose, onConfirm, merchantName, isLoading, isInternal: isMerchantInternal, email, userType }: Readonly<MakeMerchantInternalDialogProps>) {

  const [isInternal, setIsInternal] = useState<string>(isMerchantInternal ? 'yes' : 'no');

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(isInternal === 'yes');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Merchant Internal</DialogTitle>
          <DialogDescription>
            Select whether you want to make <span className="font-semibold">{merchantName}</span> an internal merchant.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex justify-center">
          <RadioGroup
            value={isInternal}
            onValueChange={setIsInternal}
            className="flex flex-row gap-8"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}
            className="w-full sm:w-auto bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
            isLoading={isLoading}
            loadingText={`Submitting ${merchantName} ...`}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}