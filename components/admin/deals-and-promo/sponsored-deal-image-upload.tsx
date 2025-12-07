'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SponsoredDealImageUploadProps {
  onImageChange: (image: File | null) => void;
  maxSize?: number; // in MB
  initialImageUrl?: string | null; // For update mode
}

export default function SponsoredDealImageUpload({
  onImageChange,
  maxSize = 5,
  initialImageUrl = null,
}: SponsoredDealImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(initialImageUrl);

  // Update display image when initialImageUrl changes
  useEffect(() => {
    if (initialImageUrl && !uploadedImage) {
      setDisplayImageUrl(initialImageUrl);
    } else if (!initialImageUrl && !uploadedImage) {
      setDisplayImageUrl(null);
    }
  }, [initialImageUrl, uploadedImage]);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload JPG, JPEG, or PNG files only.');
      return false;
    }

    // Check file size
    const maxFileSize = maxSize * 1024 * 1024;
    if (file.size > maxFileSize) {
      setError(`File must be less than ${maxSize}MB.`);
      return false;
    }

    setError('');
    return true;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (validateFile(file)) {
      setUploadedImage(file);
      onImageChange(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setDisplayImageUrl(null);
    onImageChange(null);
    setError('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasImage = uploadedImage || displayImageUrl;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Background Image</h2>

      {!hasImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageUpload}
            className="hidden"
            id="background-image-upload"
          />
          <label htmlFor="background-image-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Choose Image to <span className="text-green-600 font-medium">Upload or Drag and drop</span> or <span className="text-green-600 font-medium">click</span> to browse your device
            </p>
            <p className="text-sm text-gray-500">
              JPG or PNG Supported format. Max file size is {maxSize}MB
            </p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={uploadedImage ? URL.createObjectURL(uploadedImage) : displayImageUrl!}
              alt="Background"
              width={800}
              height={400}
              className="w-full h-full object-cover"
              unoptimized={displayImageUrl?.includes('?') || displayImageUrl?.includes('&') || displayImageUrl?.startsWith('http')}
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-10"
          >
            <X className="h-5 w-5" />
          </button>
          {uploadedImage && (
            <div className="mt-2 text-sm text-gray-500">
              {formatFileSize(uploadedImage.size)}
            </div>
          )}
          {!uploadedImage && displayImageUrl && (
            <div className="mt-2 text-sm text-gray-500">
              Current image (click to replace)
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

