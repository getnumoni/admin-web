'use client';

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetDealDetails from "@/hooks/query/useGetDealDetails";
import DealHeader from "./deal-header";
import DealImages from "./deal-images";
import DealInformation from "./deal-information";

export default function DealDetails({ dealId }: { dealId: string }) {
  const { data, isPending, error, isError, refetch } = useGetDealDetails({ dealId });

  if (isPending) {
    return <LoadingSpinner message="Loading deal details..." />;
  }

  if (isError) {
    return <ErrorState title="Error Loading Deal Details" message={error?.message || "Failed to load deal details. Please try again."} onRetry={refetch} retryText="Retry" />;
  }

  const dealData = data?.data?.data;

  if (!dealData) {
    return <ErrorState title="Deal Not Found" message="The deal you're looking for doesn't exist." onRetry={refetch} retryText="Retry" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DealHeader
          dealName={dealData.name}
          dealId={dealData.id}
          dealStatus={dealData.dealStatus}
          merchantName={dealData.merchantName}
          merchantLogo={dealData.merchantLogo}
        />

        <div className="space-y-6">
          <DealImages images={dealData.imagePath || []} />

          <DealInformation
            name={dealData.name}
            description={dealData.description}
            dealType={dealData.dealType}
            initialPrice={dealData.initialPrice}
            discount={dealData.discount}
            newPrice={dealData.newPrice}
            category={dealData.category || []}
            availableStock={dealData.availableStock}
            startDate={dealData.startDate}
            endDate={dealData.endDate}
            dealStatus={dealData.dealStatus}
            approveStatus={dealData.approveStatus}
            merchantName={dealData.merchantName}
            merchantId={dealData.merchantId}
            usageLimit={dealData.usageLimit}
            qualifyingPurchase={dealData.qualifyingPurchase}
            rewardItemQuantity={dealData.rewardItemQuantity}
            pricePerItem={dealData.pricePerItem}
            isBranchDeal={dealData.isBranchDeal}
            branchId={dealData.branchId}
          />
        </div>
      </div>
    </div>
  );
}