"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface CharityHeaderProps {
  charityName?: string;
  charityId?: string;
  logoUrl?: string;
  status?: string;
}

export default function CharityHeader({
  charityName,
  charityId,
  logoUrl,
  status = "ACTIVE"
}: CharityHeaderProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Charity Logo */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={charityName || "Charity"}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
            ) : (
              charityName?.charAt(0).toUpperCase() || "C"
            )}
          </div>

          {/* Charity Info */}
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {charityName || "Charity Organization"}
              </h1>
              <Badge
                variant={status === "ACTIVE" ? "default" : "secondary"}
                className={status === "ACTIVE" ? "bg-green-100 text-green-800" : ""}
              >
                {status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Charity ID: #{charityId || "N/A"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white">
          Select Action
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
