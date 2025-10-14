"use client"

import { validateFileSize } from "@/lib/helper"
import { FileText, Upload, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface FormPdfUploadProps {
  label: string
  description?: string
  required?: boolean
  onPdfChange: (value: string | null) => void
  maxSize?: string
  currentValue?: string | null
  error?: string
}

export function FormPdfUpload({
  label,
  description,
  required = false,
  onPdfChange,
  maxSize = "500kb",
  currentValue,
  error
}: FormPdfUploadProps) {
  const [pdfPreview, setPdfPreview] = useState<string | null>(currentValue || null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputId = `pdf-upload-${Math.random().toString(36).substr(2, 9)}`

  // Update PDF preview when current value changes
  useEffect(() => {
    setPdfPreview(currentValue || null)
  }, [currentValue])

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Strict PDF validation - only accept PDF files
      const isPdfMimeType = file.type === 'application/pdf'
      const isPdfExtension = file.name.toLowerCase().endsWith('.pdf')

      if (!isPdfMimeType && !isPdfExtension) {
        toast.error("Only PDF files are allowed. Please select a PDF file.")
        return
      }

      // Validate file size
      const sizeValidation = validateFileSize(file, maxSize)
      if (!sizeValidation.isValid) {
        toast.error(sizeValidation.error || `File size exceeds maximum allowed size of ${maxSize.toUpperCase()}`)
        return
      }

      setIsUploading(true)
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        // Remove the data:application/pdf;base64, prefix
        const cleanBase64 = base64.split(',')[1]
        // Extract file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'pdf'
        // Concatenate base64 with extension
        const base64WithExtension = `${cleanBase64}.${fileExtension}`
        setPdfPreview(cleanBase64)
        onPdfChange(base64WithExtension)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePdf = () => {
    setPdfPreview(null)
    setFileName(null)
    onPdfChange(null)
    // Clear the file input
    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

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
              className="text-red-500  p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white transition-colors"
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
      />
    </div>
  )
}
