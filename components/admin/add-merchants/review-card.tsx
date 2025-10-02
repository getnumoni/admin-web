"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Star } from "lucide-react";

interface ReviewCardProps {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  reviewText: string;
  date: string;
  onHide?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ReviewCard({
  id,
  customerName,
  customerAvatar,
  rating,
  reviewText,
  date,
  onHide,
  onDelete,
}: ReviewCardProps) {
  const initials = customerName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={customerAvatar} />
            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{customerName}</h4>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{rating}/5</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onHide?.(id)}>
              Hide
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(id)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
        {reviewText}
      </p>

      <div className="text-xs text-gray-500">
        {date}
      </div>
    </div>
  );
}
