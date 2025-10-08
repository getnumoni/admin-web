'use client';

import { Plus, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductImageProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  maxTotalSize?: number; // in MB
}

export default function ProductImageSection({
  onImagesChange,
  maxImages = 5,
  maxTotalSize = 3
}: ProductImageProps) {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  // Update parent component when images change
  useEffect(() => {
    onImagesChange(uploadedImages);
  }, [uploadedImages, onImagesChange]);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload JPG, JPEG, or PNG files only.');
      return false;
    }

    // Check file size (3MB = 3 * 1024 * 1024 bytes)
    const maxFileSize = 3 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setError('Each file must be less than 3MB.');
      return false;
    }

    setError('');
    return true;
  };

  const calculateTotalSize = (files: File[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Check if adding these files would exceed the limit
    if (uploadedImages.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of files) {
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        return; // Stop if any file is invalid
      }
    }

    // Check total size limit
    const newTotalSize = calculateTotalSize([...uploadedImages, ...validFiles]);
    const maxTotalSizeBytes = maxTotalSize * 1024 * 1024;

    if (newTotalSize > maxTotalSizeBytes) {
      setError(`Total file size must be less than ${maxTotalSize}MB.`);
      return;
    }

    // Add valid files
    setUploadedImages(prev => [...prev, ...validFiles]);
    setError(''); // Clear any previous errors
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setError(''); // Clear any errors when removing images
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = calculateTotalSize(uploadedImages);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Product Images</h2>

      {uploadedImages.length === 0 ? (
        /* Default State - Large Upload Area */
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Choose Images to <span className="text-green-600 font-medium">Upload or Drag and drop</span> or <span className="text-green-600 font-medium">click</span> to browse your device
            </p>
            <p className="text-sm text-gray-500">
              JPG or PNG Supported format. Max file size is 3mb
            </p>
          </label>
        </div>
      ) : (
        /* Images Present - Horizontal Slots View */
        <>
          <div className="flex gap-4 ">
            {/* Render uploaded images */}
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative flex-shrink-0">
                <div className="w-50 h-50 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Render empty slots */}
            {Array.from({ length: maxImages - uploadedImages.length }).map((_, index) => (
              <div key={`empty-${index}`} className="">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id={`image-upload-${index}`}
                />
                <label
                  htmlFor={`image-upload-${index}`}
                  className="w-50 h-50 border border-dashed  rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition-colors bg-white"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <Plus className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Add Images</span>
                </label>
              </div>
            ))}
          </div>

          {/* Progress Info */}
          <div className="mt-4 text-sm text-gray-500">
            {uploadedImages.length}/{maxImages} images uploaded ({formatFileSize(totalSize)}/{maxTotalSize}MB)
          </div>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
