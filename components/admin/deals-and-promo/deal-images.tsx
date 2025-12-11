"use client";

import Image from "next/image";
import { Package } from "lucide-react";

interface DealImagesProps {
  images: Array<{
    id: string;
    dealId: string;
    imagePath: string;
  }>;
}

export default function DealImages({ images }: DealImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Deal Images</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Deal Images</h3>
        <span className="text-sm text-gray-500">{images.length} {images.length === 1 ? 'image' : 'images'}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={image.imagePath}
              alt={`Deal image ${image.id}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

