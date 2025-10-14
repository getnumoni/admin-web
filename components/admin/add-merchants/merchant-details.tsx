"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { mockMerchantData } from "@/data";
import { useDeleteMerchant } from "@/hooks/mutation/useDeleteMerchant";
import { useResetMerchantPassword } from "@/hooks/mutation/useResetMerchantPassword";
import useGetMerchantDetailsById from "@/hooks/query/useGetMerchantDetailsById";
import { useState } from "react";
import AccountInformation from "./account-information";
import AdminControls from "./admin-controls";
import EndorsedCharity from "./endorsed-charity";
import MerchantDescription from "./merchant-description";
import MerchantHeader from "./merchant-header";
import MerchantKyc from "./merchant-kyc";
import MerchantRewardPoints from "./merchant-reward-points";
import MerchantTabs from "./merchant-tabs";
import PersonalInformation from "./personal-information";
import ReportsSection from "./reports-section";
import ReviewsSection from "./reviews-section";
import SingleMerchantTransaction from "./single-merchant-transaction";

interface MerchantDetailsProps {
  merchantId: string | string[] | undefined;
}

export default function MerchantDetails({ merchantId }: MerchantDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: merchantDetails, isPending: isMerchantDetailsPending } = useGetMerchantDetailsById({ merchantId: merchantId as string });
  const { handleDeleteMerchant, isPending: isDeletePending } = useDeleteMerchant();
  const { handleResetMerchantPassword, isPending: isResetPending } = useResetMerchantPassword();

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

  const handleAdjustPoints = () => {
    console.log("Adjust points");
  };

  const handleAdjustBalance = () => {
    console.log("Adjust balance");
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
              <AccountInformation {...mockMerchantData.accountInfo} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MerchantDescription
                description={merchantData?.description}
                onEdit={handleEditDescription}
                userId={merchantId ? merchantId as string : undefined}
              />
              <EndorsedCharity
                charityCount={merchantData?.charityCount}
                onManage={handleManageCharity}
              />
            </div>

            <ReportsSection
              reportsCompleted={merchantData?.reportsCompleted}
              totalReports={merchantData?.totalReports}
              onNotifyMerchant={handleNotifyMerchant}
            />

            <ReviewsSection
              reviews={mockMerchantData.reviews}
              onHideReview={handleHideReview}
              onDeleteReview={handleDeleteReview}
            />

            <AdminControls
              onAdjustPoints={handleAdjustPoints}
              onAdjustBalance={handleAdjustBalance}
              onResetPassword={handleResetPassword}
              onDeleteAccount={handleDeleteAccount}
              userName={merchantData?.businessName}
              userId={merchantId ? merchantId as string : undefined}
              businessName={merchantData?.businessName}
              isDeletePending={isDeletePending}
              isResetPending={isResetPending}
            />
          </div>
        )}

        {activeTab === "kyc" && (
          <MerchantKyc merchantDetails={merchantData} merchantId={merchantId ?? ""} />
        )}

        {activeTab === "transactions" && (
          <SingleMerchantTransaction />
        )}

        {activeTab === "rewards" && (
          <MerchantRewardPoints />
        )}
      </div>
    </div>
  );
}