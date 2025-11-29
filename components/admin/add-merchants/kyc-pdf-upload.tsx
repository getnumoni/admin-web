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
  const [pdfPreview, setPdfPreview] = useState<string | null>(currentValue || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputId = `pdf-upload-${fieldName}-${Math.random().toString(36).substr(2, 9)}`;

  // Update PDF preview when current value changes
  useEffect(() => {
    setPdfPreview(currentValue || null);
  }, [currentValue]);

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict PDF validation - only accept PDF files
    const isPdfMimeType = file.type === 'application/pdf';
    const isPdfExtension = file.name.toLowerCase().endsWith('.pdf');

    if (!isPdfMimeType && !isPdfExtension) {
      toast.error("Only PDF files are allowed. Please select a PDF file.");
      return;
    }

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
    handleUploadDealsFile(formData)
      .then((imageUrl) => {
        if (imageUrl) {
          setPdfPreview(imageUrl);
          onPdfChange(imageUrl);
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

  const handleRemovePdf = () => {
    setPdfPreview(null);
    setFileName(null);
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
        {pdfPreview ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700 truncate max-w-[200px]" title={fileName || 'PDF file'}>
                {fileName || 'PDF file uploaded'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemovePdf}
              disabled={isUploading}
              className="text-red-500 p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>
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
                {isUploading ? 'Uploading...' : 'Choose PDF file'}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                or drag and drop here
              </p>
              <p className="text-xs text-gray-400">
                Max file size: {maxSize.toUpperCase()}
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
        accept=".pdf,application/pdf"
        onChange={handlePdfChange}
        className="hidden"
        multiple={false}
        disabled={isUploading}
      />
    </div>
  );
}

