import { MerchantDetailsResponse } from "@/lib/types";
import { KycDocumentSection } from "./kyc-document-section";

interface KycDocumentListProps {
  merchantDetails: MerchantDetailsResponse;
  getDocumentStatus: (documentType: string) => 'pending' | 'approved' | 'rejected';
  isDocumentPending: (documentType: string) => boolean;
  onApprove: (documentType: string) => void;
  onReject: (documentType: string) => void;
  onVerify: (documentType: string) => void;
}

export function KycDocumentList({
  merchantDetails,
  getDocumentStatus,
  isDocumentPending,
  onApprove,
  onReject,
  onVerify,
}: KycDocumentListProps) {
  return (
    <div className="space-y-6">
      <KycDocumentSection
        title="CAC Documents"
        documentType="CAC"
        documentPath={merchantDetails?.cacDocumentPath}
        merchantDetails={merchantDetails}
        status={getDocumentStatus('CAC')}
        isPending={isDocumentPending('CAC')}
        onApprove={() => onApprove('CAC')}
        onReject={() => onReject('CAC')}
        onVerify={() => onVerify('CAC')}
      />

      <KycDocumentSection
        title="TIN Documents"
        documentType="TIN"
        documentPath={merchantDetails?.tinPath}
        merchantDetails={merchantDetails}
        status={getDocumentStatus('TIN')}
        isPending={isDocumentPending('TIN')}
        onApprove={() => onApprove('TIN')}
        onReject={() => onReject('TIN')}
        onVerify={() => onVerify('TIN')}
      />

      <KycDocumentSection
        title="NIN Documents"
        documentType="NIN"
        documentPath={merchantDetails?.nin}
        merchantDetails={merchantDetails}
        status={getDocumentStatus('NIN')}
        isPending={isDocumentPending('NIN')}
        onApprove={() => onApprove('NIN')}
        onReject={() => onReject('NIN')}
        onVerify={() => onVerify('NIN')}
      />
    </div>
  );
}

