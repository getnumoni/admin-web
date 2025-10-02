"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface EndorsedCharityProps {
  charityCount: number;
  onManage?: () => void;
  topBrands?: string[];
}

export default function EndorsedCharity({
  charityCount,
  onManage,
  topBrands = []
}: EndorsedCharityProps) {
  // Placeholder brand logos - in a real app, these would be actual brand images
  const defaultBrands = [
    "Brand A", "Brand B", "Brand C", "Brand D", "Brand E"
  ];

  const brandsToShow = topBrands.length > 0 ? topBrands : defaultBrands;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Endorsed Charity</h3>
        <Button
          onClick={onManage}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Heart className="h-4 w-4 mr-2" />
          Manage
        </Button>
      </div>

      <div className="space-y-4">
        <div className="text-3xl font-bold text-gray-900">
          {charityCount}
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Top Brands Donated</h4>
          <div className="flex flex-wrap gap-2">
            {brandsToShow.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg text-xs font-medium text-gray-600"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
