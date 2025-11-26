import { Button } from "@/components/ui/button";
import { Check, Download, Eye, X } from "lucide-react";
import { calculateBase64FileSize, downloadDocument, getDocumentDisplayName, previewDocument } from "../../../lib/merchant-kyc-helpers";

interface DocumentCardProps {
  documentType: string;
  documentName?: string;
  documentPath: string;
  fileSize?: string;
  fileType?: string;
  status: 'pending' | 'approved' | 'rejected';
  isVerified: boolean;
  isPending: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export function KycDocumentCard({
  documentType,
  documentName,
  documentPath,
  fileSize,
  fileType = "pdf",
  status,
  isVerified,
  isPending,
  onApprove,
  onReject,
}: DocumentCardProps) {
  const displayName = documentName || getDocumentDisplayName(documentType);
  const calculatedFileSize = fileSize || calculateBase64FileSize(documentPath);

  return (
    <div className="space-y-4">
      {/* Document Entry */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">PDF</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{displayName}</h4>
            <p className="text-xs text-gray-500">{calculatedFileSize} • {fileType}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => previewDocument(documentPath)}
            className="h-8 px-3"
          >
            <Eye className="h-4 w-4 mr-1" />
            Open
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadDocument(documentPath, displayName)}
            className="h-8 px-3"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>

        {/* Approve/Reject Buttons */}
        {isVerified ? (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              className="h-8 px-4 bg-green-600 hover:bg-green-700 text-white"
              disabled
            >
              <Check className="h-4 w-4 mr-1" />
              Verified
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {status === 'approved' ? (
              <Button
                size="sm"
                className="h-8 px-4 bg-green-600 hover:bg-green-700 text-white"
                disabled
              >
                <Check className="h-4 w-4 mr-1" />
                Approved
              </Button>
            ) : status === 'rejected' ? (
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-4 border-red-600 text-red-600 hover:bg-red-50"
                disabled
              >
                <X className="h-4 w-4 mr-1" />
                Rejected
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={onApprove}
                  className="h-8 px-4 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isPending}
                  isLoading={isPending}
                  loadingText="Approving..."
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onReject}
                  className="h-8 px-4 border-red-600 text-red-600 hover:bg-red-50"
                  disabled={isPending}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

