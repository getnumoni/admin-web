"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGetMerchantReviewsById from "@/hooks/query/useGetMerchantReviewsById";
import { useState } from "react";
import MerchantReviewTable from "./reviews-table";

interface ApiReview {
  id: string;
  merchantId: string | null;
  customerId: string;
  dealId: string | null;
  createdBy: string | null;
  rating: number;
  comment: string;
  createdDt: string;
  updatedDt: string;
}

interface ReviewsSectionProps {
  onHideReview?: (id: string) => void;
  onDeleteReview?: (id: string) => void;
  merchantId: string;
}

export default function ReviewsSection({
  onHideReview: _onHideReview,
  onDeleteReview: _onDeleteReview,
  merchantId
}: Readonly<ReviewsSectionProps>) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const { data: reviewsData, isPending: isReviewsPending, error, isError, refetch } = useGetMerchantReviewsById({
    merchantId,
    page: currentPage,
    size: itemsPerPage,
    sort: ["createdDt,desc"]
  });

  // Extract reviews from API response - handle both array and paginated response
  const reviews: ApiReview[] = reviewsData?.data?.data?.pageData || reviewsData?.data?.data || [];
  const totalRows = reviewsData?.data?.data?.totalRows || reviews.length;
  const totalPages = reviewsData?.data?.data?.totalPages || Math.ceil(totalRows / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isReviewsPending) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <Skeleton className="h-7 w-24 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <ErrorState
          title="Error Loading Reviews"
          message={error?.message || "Failed to load reviews. Please try again."}
          onRetry={refetch}
          retryText="Retry"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>
      {reviews.length > 0 ? (
        <MerchantReviewTable
          reviews={reviews}
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalRows={totalRows}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <EmptyState
          title="No Reviews Available"
          description="This merchant hasn't received any reviews yet. Reviews will appear here once customers start rating and commenting."
        />
      )}
    </div>
  );
}
