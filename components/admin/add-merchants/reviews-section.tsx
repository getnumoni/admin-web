"use client";

import ReviewCard from "./review-card";

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  onHideReview?: (id: string) => void;
  onDeleteReview?: (id: string) => void;
}

export default function ReviewsSection({
  reviews,
  onHideReview,
  onDeleteReview
}: ReviewsSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            {...review}
            onHide={onHideReview}
            onDelete={onDeleteReview}
          />
        ))}
      </div>
    </div>
  );
}
