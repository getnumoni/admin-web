"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { mockMerchantData } from "@/data";
import { useAdjustMerchantBalance } from "@/hooks/mutation/useAdjustMerchantBalance";
import { useAdjustMerchantPoints } from "@/hooks/mutation/useAdjustMerchantPoints";
import { useDeleteMerchant } from "@/hooks/mutation/useDeleteMerchant";
import { useResetMerchantPassword } from "@/hooks/mutation/useResetMerchantPassword";
import useGetMerchantDetailsById from "@/hooks/query/useGetMerchantDetailsById";
import { useUserAuthStore } from "@/stores/user-auth-store";
import { useState } from "react";
import { toast } from "sonner";
import AccountInformation from "./account-information";
import AdminControls from "./admin-controls";
import MerchantDescription from "./merchant-description";
import MerchantHeader from "./merchant-header";
import MerchantKyc from "./merchant-kyc";
import MerchantRewardPoints from "./merchant-reward-points";
import MerchantTabs from "./merchant-tabs";
import PersonalInformation from "./personal-information";
import ReviewsSection from "./reviews-section";
import RewardsInformation from "./rewards-information";
import SingleMerchantTransaction from "./single-merchant-transaction";

interface MerchantDetailsProps {
  merchantId: string | string[] | undefined;
}

export default function MerchantDetails({ merchantId }: MerchantDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: merchantDetails, isPending: isMerchantDetailsPending } = useGetMerchantDetailsById({ merchantId: merchantId as string });
  const { handleDeleteMerchant, isPending: isDeletePending } = useDeleteMerchant();
  const { handleResetMerchantPassword, isPending: isResetPending } = useResetMerchantPassword();
  const { handleAdjustMerchantPoints, isPending: isAdjustPointsPending, isSuccess } = useAdjustMerchantPoints();
  const { handleAdjustMerchantBalance, isPending: isAdjustBalancePending, isSuccess: isAdjustBalanceSuccess } = useAdjustMerchantBalance();

  const { user } = useUserAuthStore();

  // console.log('merchantDetails', merchantDetails?.data?.data);
  const merchantData = merchantDetails?.data?.data;

  // console.log('merchantId', merchantId);

  const handleEditPersonalInfo = () => {
    console.log("Edit personal information");
  };

  const handleEditDescription = () => {
    console.log("Edit description");
  };

  const handleManageCharity = () => {
    console.log("Manage charity");
  };

  const handleNotifyMerchant = () => {
    console.log("Notify merchant");
  };

  const handleHideReview = (id: string) => {
    console.log("Hide review:", id);
  };

  const handleDeleteReview = (id: string) => {
    console.log("Delete review:", id);
  };

  const handleAdjustPoints = (merchantId: string, walletId: string, walletType: string, points: number, reason: string) => {
    // Check if admin user is available
    if (!user?.id) {
      toast.error("Admin user not found");
      return;
    }

    if (merchantId) {
      handleAdjustMerchantPoints({
        walletId: walletId,
        points: points,
        reason: reason,
        adminId: user.id,
        walletType: walletType
      });
    }
  };

  const handleAdjustBalance = (merchantId: string, walletId: string, walletType: string, balance: number, reason: string) => {
    // Check if admin user is available
    if (!user?.id) {
      toast.error("Admin user not found");
      return;
    }

    if (merchantId) {
      handleAdjustMerchantBalance({
        walletId: walletId,
        balance: balance,
        reason: reason,
        adminId: user.id,
        walletType: walletType
      });
    }
  };

  const handleResetPassword = (data: { newPassword: string; confirmPassword: string }) => {
    if (merchantId) {
      handleResetMerchantPassword({
        id: merchantId as string,
        newPassword: data.newPassword
      });
    }
  };

  const handleDeleteAccount = () => {
    if (merchantId) {
      handleDeleteMerchant(merchantId as string);
    }
  };

  if (isMerchantDetailsPending) {
    return <LoadingSpinner message="Loading merchant details..." />
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <MerchantHeader
          merchantName={merchantData?.businessName}
          userId={merchantData?.merchantId}
          level={mockMerchantData.level}
        />

        <MerchantTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PersonalInformation
                {...merchantData}
                merchantId={merchantId}
                onEdit={handleEditPersonalInfo}
              />
              <AccountInformation merchantData={merchantData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MerchantDescription
                description={merchantData?.description}
                onEdit={handleEditDescription}
                userId={merchantId ? merchantId as string : undefined}
              />

              <RewardsInformation
                wallet={merchantData?.wallet}
                pointType={merchantData?.pointType}
              />
              {/* <EndorsedCharity
                charityCount={merchantData?.charityCount}
                onManage={handleManageCharity}
              /> */}
            </div>

            {/* <ReportsSection
              reportsCompleted={merchantData?.reportsCompleted}
              totalReports={merchantData?.totalReports}
              onNotifyMerchant={handleNotifyMerchant}
              merchantId={merchantId as string}
            /> */}

            <ReviewsSection
              onHideReview={handleHideReview}
              onDeleteReview={handleDeleteReview}
              merchantId={merchantId as string}
            />

            <AdminControls
              onAdjustPoints={handleAdjustPoints}
              onAdjustBalance={handleAdjustBalance}
              onResetPassword={handleResetPassword}
              onDeleteAccount={handleDeleteAccount}
              userName={merchantData?.businessName}
              userId={merchantId ? merchantId as string : undefined}
              businessName={merchantData?.businessName}
              walletId={merchantData?.wallet?.userId}
              isDeletePending={isDeletePending}
              isResetPending={isResetPending}
              isAdjustPointsPending={isAdjustPointsPending}
              isAdjustPointsSuccess={isSuccess}
              isAdjustBalancePending={isAdjustBalancePending}
              isAdjustBalanceSuccess={isAdjustBalanceSuccess}
            />
          </div>
        )}

        {activeTab === "kyc" && (
          <MerchantKyc merchantDetails={merchantData} merchantId={merchantId ?? ""} />
        )}

        {activeTab === "transactions" && (
          <SingleMerchantTransaction merchantId={merchantId as string} />
        )}

        {activeTab === "rewards" && (
          <MerchantRewardPoints merchantId={merchantId as string} />
        )}
      </div>
    </div>
  );
}