"use client";

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface CharityDescriptionProps {
  description: string;
}

export default function CharityDescription({ description }: CharityDescriptionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Charity Description</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit description
        </Button>
      </div>

      <div className="text-gray-700 leading-relaxed">
        {description || "No description provided."}
      </div>
    </div>
  );
}
