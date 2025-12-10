"use client";

import { Badge } from "@/components/ui/badge";
import { getDealStatusColor, getDealStatusText } from "@/lib/helper";
import { Check } from "lucide-react";
import Image from "next/image";

interface DealHeaderProps {
  dealName: string;
  dealId: string;
  dealStatus: string;
  merchantName?: string;
  merchantLogo?: string | null;
}

export default function DealHeader({ dealName, dealId, dealStatus, merchantName, merchantLogo }: DealHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {merchantLogo && (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <Image
              src={merchantLogo}
              alt={merchantName || "Merchant"}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{dealName}</h1>
          {dealStatus?.toUpperCase() === 'ACTIVE' && (
            <Check className="h-5 w-5 text-green-600" />
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Deal ID: {dealId}</span>
          <Badge variant="secondary" className={getDealStatusColor(dealStatus)}>
            {getDealStatusText(dealStatus)}
          </Badge>
          {merchantName && (
            <span className="text-sm text-gray-600">Merchant: {merchantName}</span>
          )}
        </div>
      </div>
    </div>
  );
}

