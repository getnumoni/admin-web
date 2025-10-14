import { useResetCustomerPassword } from "@/hooks/mutation/useResetCustomerPassword";
import { CustomerDetailsResponse } from "@/lib/types";
import CustomerAccountInfo from "./customer-account-info";
import CustomerAdminControls from "./customer-admin-controls";
import CustomerFinancialOverview from "./customer-financial-overview";
import CustomerPersonalInfo from "./customer-personal-info";
import CustomerReviewsSection from "./customer-reviews-section";

export default function CustomerOverview({ customerData }: { customerData: CustomerDetailsResponse }) {
  const { handleResetCustomerPassword, isPending: isResetPending } = useResetCustomerPassword();

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

  const handleAdjustPoints = () => {
    console.log("Adjust customer points");
  };

  const handleAdjustBalance = () => {
    console.log("Adjust customer balance");
  };

  const handleResetPassword = (data: { newPassword: string; confirmPassword: string }) => {
    if (customerData?.userId) {
      handleResetCustomerPassword({
        id: customerData.userId,
        newPassword: data.newPassword,
      });
    }
  };

  const handleDeleteAccount = () => {
    console.log("Delete customer account");
  };

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
      onAdjustPoints={handleAdjustPoints}
      onAdjustBalance={handleAdjustBalance}
      onResetPassword={handleResetPassword}
      onDeleteAccount={handleDeleteAccount}
      userName={customerData?.name}
      userId={customerData?.userId}
      isResetPending={isResetPending}
    />
  </main>;
}