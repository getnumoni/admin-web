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

  // Mock customer reviews data
  const mockCustomerReviews = [
    {
      id: "1",
      merchantName: "NyxLuxe Lingeries",
      merchantAvatar: "/merchants/nyxluxe.jpg",
      rating: 4.2,
      reviewText: "Great service and quality products. Highly recommend!",
      date: "21 Jun 2022 - 10:30am",
    },
    {
      id: "2",
      merchantName: "TechStore Pro",
      merchantAvatar: "/merchants/techstore.jpg",
      rating: 4.5,
      reviewText: "Excellent customer service and fast delivery.",
      date: "20 Jun 2022 - 2:15pm",
    },
    {
      id: "3",
      merchantName: "Fashion Hub",
      merchantAvatar: "/merchants/fashionhub.jpg",
      rating: 4.0,
      reviewText: "Good quality products, will definitely order again.",
      date: "19 Jun 2022 - 9:45am",
    },
    {
      id: "4",
      merchantName: "Home Essentials",
      merchantAvatar: "/merchants/homeessentials.jpg",
      rating: 4.8,
      reviewText: "Outstanding experience! The team was very helpful.",
      date: "18 Jun 2022 - 4:20pm",
    },
  ];


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
    <CustomerFinancialOverview />
    <CustomerReviewsSection
      reviews={mockCustomerReviews}
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