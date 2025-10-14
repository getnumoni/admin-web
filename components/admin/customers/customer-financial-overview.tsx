"use client";

import { formatCurrency } from "@/lib/helper";

// interface CustomerFinancialOverviewProps {
//   customerData: CustomerDetailsResponse;
// }

export default function CustomerFinancialOverview() {
  // Mock data - replace with actual customer data when available
  const financialData = {
    walletBalance: 900300,
    allTimeSpent: 90000000,
    allTimeWithdraws: 40000000,
    pointBalance: 900300,
    allTimePointsDonated: 90000000,
    allTimePointsEarned: 40000000,
    allTimePointsRedeemed: 40000000,
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 my-4">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">Financial Overview</h1>
      </div>

      {/* Cards Container */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Wallet Balance Card */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Wallet Balance</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {formatCurrency(financialData.walletBalance)}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">All time spent</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimeSpent)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time withdraws</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimeWithdraws)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time withdraws</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimeWithdraws)}
                </p>
              </div>
            </div>
          </div>

          {/* Available Point Balance Card */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Point Balance</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {formatCurrency(financialData.pointBalance)}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points donated</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimePointsDonated)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points earned</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimePointsEarned)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points Redeemed</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(financialData.allTimePointsRedeemed)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}