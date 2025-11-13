import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MerchantDetailsResponse } from "@/lib/types";
import { Check, Download, Eye, Plus, Trash2, X } from "lucide-react";

import { useState } from "react";
import MerchantKycDialog from "./merchant-kyc-dialog";

export default function MerchantKyc({ merchantDetails, merchantId }: { merchantDetails: MerchantDetailsResponse, merchantId: string | string[] | undefined }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentStatus, setDocumentStatus] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({});

  // Check if any of the KYC-related fields are null
  const hasKycData = merchantDetails?.cacDocumentPath ||
    merchantDetails?.menuPath ||
    merchantDetails?.reqCertificatePath ||
    merchantDetails?.businessReqNo;

  // console.log('merchantDetails', merchantDetails);
  // console.log('hasKycData', hasKycData);

  const handleApprove = (documentType: string) => {
    setDocumentStatus(prev => ({ ...prev, [documentType]: 'approved' }));
  };

  const handleReject = (documentType: string) => {
    setDocumentStatus(prev => ({ ...prev, [documentType]: 'rejected' }));
  };

  const handlePreview = (documentPath: string) => {
    // Check if it's a base64 PDF
    if (documentPath.startsWith('data:application/pdf;base64,')) {
      window.open(documentPath, '_blank');
    } else {
      // For regular URLs
      window.open(documentPath, '_blank');
    }
  };

  const handleDownload = (documentPath: string, documentName: string) => {
    if (documentPath.startsWith('data:application/pdf;base64,')) {
      // Handle base64 PDF download
      const link = document.createElement('a');
      link.href = documentPath;
      link.download = documentName;
      link.click();
    } else {
      // Handle regular URL download
      const link = document.createElement('a');
      link.href = documentPath;
      link.download = documentName;
      link.target = '_blank';
      link.click();
    }
  };

  const handleDelete = (documentType: string) => {
    // console.log('Delete document:', documentType);
    // Implement delete functionality
  };

  const DocumentCard = ({
    documentType,
    documentName,
    documentPath,
    fileSize,
    fileType = "pdf"
  }: {
    documentType: string;
    documentName: string;
    documentPath: string;
    fileSize?: string;
    fileType?: string;
  }) => {
    const status = documentStatus[documentType] || 'pending';

    // Generate document name based on document type if not provided
    const getDocumentName = () => {
      if (documentName) return documentName;

      const nameMap: Record<string, string> = {
        'cac': 'CAC Document',
        'tin': 'TIN Document',
        'taxCertificate': 'Tax Certificate',
        'menu': 'Menu Document'
      };

      return nameMap[documentType] || 'Document';
    };

    // Calculate file size for base64 content
    const getFileSize = () => {
      if (fileSize) return fileSize;
      if (documentPath.startsWith('data:application/pdf;base64,')) {
        const base64Length = documentPath.split(',')[1]?.length || 0;
        const sizeInBytes = (base64Length * 3) / 4;
        if (sizeInBytes > 1024 * 1024) {
          return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
        } else {
          return `${(sizeInBytes / 1024).toFixed(1)}KB`;
        }
      }
      return "30kb";
    };

    return (
      <div className="space-y-4">
        {/* Document Entry */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
              <span className="text-white text-xs font-medium">PDF</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{getDocumentName()}</h4>
              <p className="text-xs text-gray-500">{getFileSize()} • {fileType}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreview(documentPath)}
              className="h-8 px-3"
            >
              <Eye className="h-4 w-4 mr-1" />
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(documentPath, getDocumentName())}
              className="h-8 px-3"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(documentType)}
              className="h-8 px-3 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>

          {/* Approve/Reject Buttons */}
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
                  onClick={() => handleApprove(documentType)}
                  className="h-8 px-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(documentType)}
                  className="h-8 px-4 border-red-600 text-red-600 hover:bg-red-50"
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

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

      {!hasKycData ? (
        <div className="bg-white rounded-lg border border-gray-200">
          <EmptyState
            title="No KYC Information"
            description="This merchant hasn't submitted any KYC documents yet. Click 'Add KYC' to start the verification process."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* CAC Documents Section */}
          {merchantDetails?.cacDocumentPath && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">CAC Documents</h3>
              </div>
              <div className="p-6">
                <DocumentCard
                  documentType="cac"
                  documentName=""
                  documentPath={merchantDetails.cacDocumentPath}
                  fileType="pdf"
                />
              </div>
            </div>
          )}

          {/* TIN Documents Section */}
          {merchantDetails?.tinPath && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">TIN Documents</h3>
              </div>
              <div className="p-6">
                <DocumentCard
                  documentType="tin"
                  documentName=""
                  documentPath={merchantDetails.tinPath}
                  fileType="pdf"
                />
              </div>
            </div>
          )}

          {/* Tax Certificate Section */}
          {merchantDetails?.reqCertificatePath && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Tax Certificate</h3>
              </div>
              <div className="p-6">
                <DocumentCard
                  documentType="taxCertificate"
                  documentName=""
                  documentPath={merchantDetails.reqCertificatePath}
                  fileType="pdf"
                />
              </div>
            </div>
          )}

          {/* Menu Documents Section */}
          {merchantDetails?.menuPath && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Menu Documents</h3>
              </div>
              <div className="p-6">
                <DocumentCard
                  documentType="menu"
                  documentName=""
                  documentPath={merchantDetails.menuPath}
                  fileType="pdf"
                />
              </div>
            </div>
          )}


        </div>
      )}

      <MerchantKycDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        businessName={merchantDetails.businessName}
        merchantId={Array.isArray(merchantId) ? merchantId[0] : merchantId || ""}
        existingKycData={{
          menuPath: merchantDetails?.menuPath,
          reqCertificatePath: merchantDetails?.reqCertificatePath
        }}
      />
    </main>
  )
}