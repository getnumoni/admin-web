import { Button } from "@/components/ui/button";
import { MerchantDetailsResponse } from "@/lib/types";
import { getDocumentDisplayName, getDocumentNumber, isDocumentVerified } from "../../../lib/merchant-kyc-helpers";
import { KycDocumentCard } from "./kyc-document-card";

interface DocumentSectionProps {
  title: string;
  documentType: 'CAC' | 'TIN' | 'TAX' | 'NIN';
  documentPath: string | null | undefined;
  merchantDetails: MerchantDetailsResponse;
  status: 'pending' | 'approved' | 'rejected';
  isPending: boolean;
  onApprove: () => void;
  onReject: () => void;
  onVerify?: () => void;
}

export function KycDocumentSection({
  title,
  documentType,
  documentPath,
  merchantDetails,
  status,
  isPending,
  onApprove,
  onReject,
  onVerify,
}: DocumentSectionProps) {
  const isVerified = isDocumentVerified(documentType, merchantDetails);
  const documentNumber = getDocumentNumber(documentType, merchantDetails);
  const verifyButtonText = `Verify ${documentType}`;

  // CAC is compulsory - require document path
  // TIN and NIN can show even without document path if number exists
  if (documentType === 'CAC' && !documentPath) return null;
  if ((documentType === 'TIN' || documentType === 'NIN') && !documentPath && !documentNumber) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onVerify && (
          <Button
            onClick={onVerify}
            size="sm"
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
          >
            {verifyButtonText}
          </Button>
        )}
      </div>
      <div className="p-6">
        <KycDocumentCard
          documentType={documentType}
          documentName={getDocumentDisplayName(documentType)}
          documentPath={documentPath}
          documentNumber={documentNumber}
          fileType="pdf"
          status={status}
          isVerified={isVerified}
          isPending={isPending}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </div>
  );
}

