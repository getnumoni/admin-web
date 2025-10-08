import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionButton,
  illustration,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 ${className}`}>
      {/* Illustration */}
      {illustration || (
        <div className="w-32 h-32 mb-6 flex items-center justify-center">
          <div className="w-24 h-20 bg-gray-100 rounded-lg relative">
            {/* Box illustration */}
            <div className="absolute inset-2 border-2 border-gray-300 rounded"></div>
            <div className="absolute top-0 left-2 right-2 h-2 bg-gray-300 rounded-t"></div>
            {/* Dashed lines and stars */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 border-2 border-dashed border-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionButton}
    </div>
  );
};
