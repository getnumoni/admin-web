"use client";

import ReviewCard from "@/components/common/review-card";

interface Review {
  id: string;
  merchantName: string;
  merchantAvatar?: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface CustomerReviewsSectionProps {
  reviews: Review[];
  onHideReview?: (id: string) => void;
  onDeleteReview?: (id: string) => void;
}

export default function CustomerReviewsSection({
  reviews,
  onHideReview,
  onDeleteReview
}: CustomerReviewsSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            customerName={review.merchantName}
            customerAvatar={review.merchantAvatar}
            rating={review.rating}
            reviewText={review.reviewText}
            date={review.date}
            onHide={onHideReview}
            onDelete={onDeleteReview}
          />
        ))}
      </div>
    </div>
  );
}
