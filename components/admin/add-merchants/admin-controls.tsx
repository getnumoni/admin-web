"use client";

import { Button } from "@/components/ui/button";
import {
  Coins,
  DollarSign,
  Key,
  Trash2
} from "lucide-react";

interface AdminControlsProps {
  onAdjustPoints?: () => void;
  onAdjustBalance?: () => void;
  onResetPassword?: () => void;
  onDeleteAccount?: () => void;
}

export default function AdminControls({
  onAdjustPoints,
  onAdjustBalance,
  onResetPassword,
  onDeleteAccount,
}: AdminControlsProps) {
  const controls = [
    {
      label: "Adjust Points",
      icon: Coins,
      onClick: onAdjustPoints,
      variant: "default" as const,
      className: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Adjust Balance",
      icon: DollarSign,
      onClick: onAdjustBalance,
      variant: "outline" as const,
      className: "border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      label: "Reset Password",
      icon: Key,
      onClick: onResetPassword,
      variant: "outline" as const,
      className: "border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      label: "Delete Account",
      icon: Trash2,
      onClick: onDeleteAccount,
      variant: "outline" as const,
      className: "border-red-300 text-red-600 hover:bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Controls</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {controls.map((control, index) => (
          <Button
            key={index}
            variant={control.variant}
            onClick={control.onClick}
            className={`flex items-center gap-2 ${control.className}`}
          >
            <control.icon className="h-4 w-4" />
            {control.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
