import { Button } from "@/components/ui/button";
import { MerchantDetailsResponse } from "@/lib/types";
import { Plus } from "lucide-react";

import { useState } from "react";
import MerchantKycDialog from "./merchant-kyc-dialog";

export default function MerchantKyc({ merchantDetails, merchantId }: { merchantDetails: MerchantDetailsResponse, merchantId: string | string[] | undefined }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // console.log('merchantId', merchantId);

  console.log('merchantDetails', merchantDetails?.businessName);
  return (
    <main>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex"
        >
          <Plus className="h-4 w-4" />
          Add KYC
        </Button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Information</h3>
        <p className="text-gray-600">KYC details will be displayed here.</p>
      </div>

      <MerchantKycDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        businessName={merchantDetails.businessName}
        merchantId={Array.isArray(merchantId) ? merchantId[0] : merchantId || ""}
      />
    </main>
  )
}