"use client";

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface MerchantDescriptionProps {
  description: string;
  onEdit?: () => void;
}

export default function MerchantDescription({ description, onEdit }: MerchantDescriptionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Merchant Description</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit description
        </Button>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">
          {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
        </p>
      </div>
    </div>
  );
}
