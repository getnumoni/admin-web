"use client";

import ReviewCard from "@/components/common/review-card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGerReviewsByMerchantId from "@/hooks/query/useGerReviewsByMerchantId";
import { formatDateReadable } from "@/lib/helper";
import { useMemo } from "react";

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface ApiReview {
  id: string;
  merchantId: string;
  customerId: string;
  dealId: string;
  createdBy: string | null;
  rating: number;
  comment: string;
  createdDt: string;
  updatedDt: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  onHideReview?: (id: string) => void;
  onDeleteReview?: (id: string) => void;
  merchantId: string;
}

// Type guard to check if review is in API format
const isApiReview = (review: unknown): review is ApiReview => {
  return (
    typeof review === 'object' &&
    review !== null &&
    'comment' in review &&
    'createdDt' in review &&
    !('reviewText' in review)
  );
};

// Type guard to check if review is already in Review format
const isReview = (review: unknown): review is Review => {
  return (
    typeof review === 'object' &&
    review !== null &&
    'reviewText' in review &&
    'customerName' in review
  );
};

// Helper function to map API review data to Review format
const mapApiReviewToReview = (apiReview: ApiReview): Review => {
  // Format date from ISO string to readable format
  const formattedDate = formatDateReadable(apiReview.createdDt);

  // Determine customer name - use createdBy if available, otherwise use Customer with short ID
  // You can enhance this later by fetching customer details using customerId if needed
  const customerName = apiReview.createdBy?.trim() || `Customer ${apiReview.customerId.slice(-6)}`;

  return {
    id: apiReview.id,
    customerName,
    customerAvatar: undefined, // API doesn't provide avatar
    rating: apiReview.rating,
    reviewText: apiReview.comment || "No comment provided",
    date: formattedDate,
  };
};

export default function ReviewsSection({
  reviews,
  onHideReview,
  onDeleteReview,
  merchantId
}: ReviewsSectionProps) {

  const { data: reviewsData, isPending: isReviewsPending, error, isError, refetch } = useGerReviewsByMerchantId({ merchantId });

  console.log(reviewsData?.data?.data);

  // Map API data to Review format, or use prop reviews as fallback
  const displayReviews: Review[] = useMemo(() => {
    const apiReviews = reviewsData?.data?.data || [];

    if (Array.isArray(apiReviews) && apiReviews.length > 0) {
      // Filter out null/undefined items and validate types
      const validReviews = apiReviews.filter(
        (review): review is ApiReview | Review =>
          review !== null && review !== undefined && (isApiReview(review) || isReview(review))
      );

      if (validReviews.length === 0) {
        return reviews || [];
      }

      // Check if it's API format by looking for 'comment' field in any review
      const isApiFormat = validReviews.some(isApiReview);

      if (isApiFormat) {
        // It's API format - map all reviews that are ApiReview type
        return validReviews
          .filter(isApiReview)
          .map(mapApiReviewToReview);
      }

      // Already in Review format - filter and return only Review types
      return validReviews.filter(isReview);
    }

    // Fall back to prop reviews
    return reviews || [];
  }, [reviewsData?.data?.data, reviews]);

  if (isReviewsPending) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <Skeleton className="h-7 w-24 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <Skeleton className="h-16 w-full mb-3" />
              <Skeleton className="h-3 w-24" />
            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayReviews.length > 0 ? (
          displayReviews.map((review) => (
            <ReviewCard
              key={review.id}
              {...review}
              onHide={onHideReview}
              onDelete={onDeleteReview}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No reviews available
          </div>
        )}
      </div>
    </div>
  );
}
