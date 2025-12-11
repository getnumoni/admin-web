"use client";

import { useUploadDealsFile } from "@/hooks/mutation/useUploadDealsFile";
import { validateFileSize } from "@/lib/helper";
import { FileText, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface KycPdfUploadProps {
  label: string;
  description?: string;
  required?: boolean;
  onPdfChange: (value: string | null) => void;
  maxSize?: string;
  currentValue?: string | null;
  error?: string;
  fieldName: string;
}

export function KycPdfUpload({
  label,
  description,
  required = false,
  onPdfChange,
  maxSize = "500kb",
  currentValue,
  error,
  fieldName,
}: KycPdfUploadProps) {
  const { handleUploadDealsFile, isPending: isUploading } = useUploadDealsFile();

  // Map fieldName to document type
  const getDocumentType = (): 'CAC' | 'TIN' | 'TAX' | 'NIN' | null => {
    if (fieldName === 'cacDocumentPath') return 'CAC';
    if (fieldName === 'tinPath') return 'TIN';
    if (fieldName === 'reqCertificatePath') return 'TAX';
    if (fieldName === 'menuPath') return 'NIN';
    return null;
  };
  const [filePreview, setFilePreview] = useState<string | null>(currentValue || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);
  const inputId = `file-upload-${fieldName}-${Math.random().toString(36).substr(2, 9)}`;

  // Update file preview when current value changes
  useEffect(() => {
    setFilePreview(currentValue || null);
    // Determine file type from URL
    if (currentValue) {
      const url = currentValue.toLowerCase();
      if (url.includes('.pdf')) {
        setFileType('pdf');
      } else if (url.match(/\.(jpg|jpeg|png)$/)) {
        setFileType('image');
      }
    }
  }, [currentValue]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - accept PDF and image files (jpeg, jpg, png)
    const validPdfTypes = ['application/pdf'];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validExtensions = ['.pdf', '.jpeg', '.jpg', '.png'];

    const isValidMimeType = validPdfTypes.includes(file.type) || validImageTypes.includes(file.type);
    const isValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isValidMimeType && !isValidExtension) {
      toast.error("Only PDF, JPEG, JPG, and PNG files are allowed.");
      return;
    }

    // Determine file type
    const isImage = validImageTypes.includes(file.type) || ['.jpeg', '.jpg', '.png'].some(ext => file.name.toLowerCase().endsWith(ext));
    setFileType(isImage ? 'image' : 'pdf');

    // Validate file size
    const sizeValidation = validateFileSize(file, maxSize);
    if (!sizeValidation.isValid) {
      toast.error(sizeValidation.error || `File size exceeds maximum allowed size of ${maxSize.toUpperCase()}`);
      return;
    }

    setFileName(file.name);

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);

    // Upload file immediately - hook handles success/error toasts
    const documentType = getDocumentType();
    handleUploadDealsFile(formData, documentType)
      .then((fileUrl) => {
        if (fileUrl) {
          setFilePreview(fileUrl);
          onPdfChange(fileUrl);
        } else {
          // Clear the file input if no URL returned
          const fileInput = document.getElementById(inputId) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        }
      })
      .catch(() => {
        // Clear the file input on error - hook already shows error toast
        const fileInput = document.getElementById(inputId) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      });
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileName(null);
    setFileType(null);
    onPdfChange(null);
    // Clear the file input
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#838383]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${error
          ? 'border-red-300 bg-red-50'
          : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        {filePreview ? (
          <div className="space-y-3">
            {fileType === 'image' ? (
              <div className="relative">
                <img
                  src={filePreview}
                  alt={fileName || 'Uploaded image'}
                  className="max-h-48 mx-auto rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                  className="absolute top-2 right-2 text-red-500 bg-white p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 shadow-md"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 truncate max-w-[200px]" title={fileName || 'PDF file'}>
                    {fileName || 'PDF file uploaded'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                  className="text-red-500 p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 text-gray-400 mx-auto" />
            <div>
              <button
                type="button"
                onClick={() => document.getElementById(inputId)?.click()}
                disabled={isUploading}
                className="text-gray-800 hover:text-gray-900 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Choose file'}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                or drag and drop here
              </p>
              <p className="text-xs text-gray-400">
                PDF, JPEG, JPG, or PNG • Max file size: {maxSize.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <input
        type="file"
        id={inputId}
        accept=".pdf,application/pdf,.jpeg,.jpg,.png,image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        className="hidden"
        multiple={false}
        disabled={isUploading}
      />
    </div>
  );
}

