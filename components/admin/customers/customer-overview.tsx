import { CustomerDetailsResponse } from "@/lib/types";
import CustomerAccountInfo from "./customer-account-info";
import CustomerAdminControls from "./customer-admin-controls";
import CustomerFinancialOverview from "./customer-financial-overview";
import CustomerPersonalInfo from "./customer-personal-info";
import CustomerReviewsSection from "./customer-reviews-section";

interface CustomerOverviewProps {
  customerData: CustomerDetailsResponse;
  onAdjustPoints: (customerId: string, walletId: string, walletType: string, points: number, reason: string) => void;
  onAdjustBalance: (customerId: string, walletId: string, walletType: string, balance: number, reason: string) => void;
  onResetPassword: (data: { newPassword: string; confirmPassword: string }) => void;
  onDeleteAccount: () => void;
  customerId: string;
  isAdjustPointsPending: boolean;
  isAdjustPointsSuccess: boolean;
  isAdjustBalancePending: boolean;
  isAdjustBalanceSuccess: boolean;
}

export default function CustomerOverview({
  customerData,
  onAdjustPoints,
  onAdjustBalance,
  onResetPassword,
  onDeleteAccount,
  customerId,
  isAdjustPointsPending,
  isAdjustPointsSuccess,
  isAdjustBalancePending,
  isAdjustBalanceSuccess
}: CustomerOverviewProps) {

  const handleHideReview = (id: string) => {
    console.log("Hide review:", id);
  };

  const handleDeleteReview = (id: string) => {
    console.log("Delete review:", id);
  };

  return <main>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerPersonalInfo customerData={customerData} />
      <CustomerAccountInfo customerData={customerData} />
    </div>
    <div className="hidden" data-customer-id={customerId} />
    <CustomerFinancialOverview customerData={customerData} />
    <CustomerReviewsSection
      customerId={customerId}
      onHideReview={handleHideReview}
      onDeleteReview={handleDeleteReview}
    />
    <CustomerAdminControls
      onAdjustPoints={onAdjustPoints}
      onAdjustBalance={onAdjustBalance}
      onResetPassword={onResetPassword}
      onDeleteAccount={onDeleteAccount}
      userName={customerData?.name}
      userId={customerData?.userId}
      walletId={customerData?.wallet?.userId || undefined}
      isAdjustPointsPending={isAdjustPointsPending}
      isAdjustPointsSuccess={isAdjustPointsSuccess}
      isAdjustBalancePending={isAdjustBalancePending}
      isAdjustBalanceSuccess={isAdjustBalanceSuccess}
    />
  </main>;
}