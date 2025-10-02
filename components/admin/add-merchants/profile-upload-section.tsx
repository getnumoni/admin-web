
'use client';

import { ProfileUploadProps } from '@/lib/types/admin';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function ProfileUploadSection({ onImageChange, imageUrl }: ProfileUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);
  const [error, setError] = useState<string>('');

  // Update image preview when imageUrl changes
  useEffect(() => {
    setImagePreview(imageUrl || null);
  }, [imageUrl]);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, JPEG, or PNG file only.');
      return false;
    }

    // Check file size (1MB = 1024 * 1024 bytes)
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 1MB.');
      return false;
    }

    setError('');
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImagePreview(base64);
        onImageChange(base64);
        setError(''); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col items-start">
        {/* Large Circular Profile Area */}
        <div className="w-32 h-32 mb-4 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden relative">
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full border border-gray-100"
              />
            </>
          ) : (
            <div className="flex items-center justify-center">
              <User className="w-16 h-16 text-purple-400" />
            </div>
          )}
        </div>

        {/* File Input */}
        <input
          type="file"
          id="profile-upload"
          accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Green Button */}
        <button
          type="button"
          onClick={() => document.getElementById('profile-upload')?.click()}
          className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-2 rounded-lg font-medium transition-colors mb-2"
        >
          {imagePreview ? 'Tap to change logo' : 'Tap to upload logo'}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-left">{error}</p>
        )}
      </div>
    </div>
  );
}
