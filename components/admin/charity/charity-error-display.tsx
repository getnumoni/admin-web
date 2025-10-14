"use client";

interface CharityErrorDisplayProps {
  error?: string;
  onRetry: () => void;
}

export default function CharityErrorDisplay({ error, onRetry }: CharityErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Charity Organizations</h3>
        <p className="text-gray-600 mb-4">
          {error || "Failed to load charity organizations. Please try again."}
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-theme-dark-green text-white rounded-lg hover:bg-theme-dark-green/90 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
