import { MerchantDetailsResponse } from "@/lib/types";
import { getDocumentDisplayName, isDocumentVerified } from "../../../lib/merchant-kyc-helpers";
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
}: DocumentSectionProps) {
  if (!documentPath) return null;

  const isVerified = isDocumentVerified(documentType, merchantDetails);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">
        <KycDocumentCard
          documentType={documentType}
          documentName={getDocumentDisplayName(documentType)}
          documentPath={documentPath}
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

