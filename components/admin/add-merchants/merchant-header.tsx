"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

interface MerchantHeaderProps {
  merchantName: string;
  userId: string;
  level: string;
}

export default function MerchantHeader({ merchantName, userId, level }: MerchantHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{merchantName}</h1>
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">User ID: {userId}</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {level}
          </Badge>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Select Action
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit Merchant</DropdownMenuItem>
          <DropdownMenuItem>Send Notification</DropdownMenuItem>
          <DropdownMenuItem>Export Data</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
