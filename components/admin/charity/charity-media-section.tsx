"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface CharityMediaSectionProps {
  mediaImages: string[];
  onRemoveImage: (index: number) => void;
  onAddImage: () => void;
}

export default function CharityMediaSection({
  mediaImages,
  onRemoveImage,
  onAddImage
}: CharityMediaSectionProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Add Media</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediaImages.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Media ${index + 1}`}
              width={200}
              height={200}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {Array.from({ length: 6 - mediaImages.length }).map((_, index) => (
          <div
            key={index}
            onClick={onAddImage}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer"
          >
            <span className="text-2xl text-gray-400">+</span>
            <span className="text-sm text-gray-500 mt-1">Add Images</span>
          </div>
        ))}
      </div>
    </div>
  );
}
