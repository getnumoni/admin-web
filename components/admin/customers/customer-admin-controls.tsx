"use client";

import AdjustBalanceDialog from "@/components/common/adjust-balance-dialog";
import AdjustPointsDialog from "@/components/common/adjust-points-dialog";
import ResetPasswordDialog from "@/components/common/reset-password-dialog";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  Coins,
  Key,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CustomerAdminControlsProps {
  onAdjustPoints?: (customerId: string, walletId: string, walletType: string, points: number, reason: string) => void;
  onAdjustBalance?: (customerId: string, walletId: string, walletType: string, balance: number, reason: string) => void;
  onResetPassword?: (data: { newPassword: string; confirmPassword: string }) => void;
  onDeleteAccount?: () => void;
  userName?: string;
  userId?: string;
  walletId?: string;
  isResetPending?: boolean;
  isAdjustPointsPending?: boolean;
  isAdjustPointsSuccess?: boolean;
  isAdjustBalancePending?: boolean;
  isAdjustBalanceSuccess?: boolean;
}

export default function CustomerAdminControls({
  onAdjustPoints,
  onAdjustBalance,
  onResetPassword,
  onDeleteAccount,
  userName,
  userId,
  walletId,
  isResetPending = false,
  isAdjustPointsPending = false,
  isAdjustPointsSuccess = false,
  isAdjustBalancePending = false,
  isAdjustBalanceSuccess = false,
}: CustomerAdminControlsProps) {
  const [isAdjustPointsOpen, setIsAdjustPointsOpen] = useState(false);
  const [isAdjustBalanceOpen, setIsAdjustBalanceOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Close adjust points modal when operation is successful
  useEffect(() => {
    if (isAdjustPointsSuccess && isAdjustPointsOpen) {
      setIsAdjustPointsOpen(false);
    }
  }, [isAdjustPointsSuccess, isAdjustPointsOpen]);

  // Close adjust balance modal when operation is successful
  useEffect(() => {
    if (isAdjustBalanceSuccess && isAdjustBalanceOpen) {
      setIsAdjustBalanceOpen(false);
    }
  }, [isAdjustBalanceSuccess, isAdjustBalanceOpen]);

  const handleAdjustPointsConfirm = (data: { wallet: string; points: number; reason: string }) => {
    if (userId && walletId) {
      onAdjustPoints?.(userId, walletId, data.wallet, data.points, data.reason);
    }
  };

  const handleAdjustBalanceConfirm = (data: { wallet: string; balance: number; reason: string }) => {
    if (userId && walletId) {
      onAdjustBalance?.(userId, walletId, data.wallet, data.balance, data.reason);
    }
  };

  const handleAdjustPointsClick = () => {
    if (!walletId) {
      toast.error(`This customer ${userName || 'Unknown'} doesn't have a configured wallet`);
      return;
    }
    setIsAdjustPointsOpen(true);
  };

  const handleAdjustBalanceClick = () => {
    if (!walletId) {
      toast.error(`This customer ${userName || 'Unknown'} doesn't have a configured wallet`);
      return;
    }
    setIsAdjustBalanceOpen(true);
  };

  const handleResetPasswordConfirm = (data: { newPassword: string; confirmPassword: string }) => {
    onResetPassword?.(data);
  };

  const controls = [
    {
      label: "Adjust Points",
      icon: Coins,
      onClick: handleAdjustPointsClick,
      variant: "default" as const,
      className: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Adjust Balance",
      icon: Banknote,
      onClick: handleAdjustBalanceClick,
      variant: "outline" as const,
      className: "border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      label: "Reset Password",
      icon: Key,
      onClick: () => setIsResetPasswordOpen(true),
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
    <main className="mt-6">
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

      {/* Dialogs */}
      <AdjustPointsDialog
        isOpen={isAdjustPointsOpen}
        onClose={() => setIsAdjustPointsOpen(false)}
        onConfirm={handleAdjustPointsConfirm}
        userName={userName}
        userId={userId}
        isAdjustPointsPending={isAdjustPointsPending}
        isAdjustPointsSuccess={isAdjustPointsSuccess}
      />

      <AdjustBalanceDialog
        isOpen={isAdjustBalanceOpen}
        onClose={() => setIsAdjustBalanceOpen(false)}
        onConfirm={handleAdjustBalanceConfirm}
        userName={userName}
        userId={userId}
        isAdjustBalancePending={isAdjustBalancePending}
        isAdjustBalanceSuccess={isAdjustBalanceSuccess}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onConfirm={handleResetPasswordConfirm}
        userName={userName}
        userId={userId}
        isLoading={isResetPending}
      />
    </main>
  );
}
