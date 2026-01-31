"use client";

import { formatCurrency } from "@/lib/helper";
import { CustomerDetailsResponse } from "@/lib/types";

export default function CustomerFinancialOverview({ customerData }: Readonly<{ customerData: CustomerDetailsResponse }>) {

  // console.log('customerData', customerData);
  const financialOverview = customerData?.financialOverview;
  const walletPointBalance = financialOverview?.walletPointBalance;
  const brandPointBalance = financialOverview?.brandPointBalance;

  // Extract wallet balance from wallet object (in naira)
  // const walletBalance = customerData?.wallet?.amount || 0;

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
              {formatCurrency(walletPointBalance?.totalPoint || 0)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">All time spent</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(walletPointBalance?.allTimeSpent || 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Points</p>
                <p className="text-sm font-semibold text-gray-900">
                  {walletPointBalance?.totalPoint?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Available Point Balance Card */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Point Balance</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {brandPointBalance?.totalBrandPoint?.toLocaleString() || 0}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points donated</p>
                <p className="text-sm font-semibold text-gray-900">
                  {brandPointBalance?.allBrandPointsDonated?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points earned</p>
                <p className="text-sm font-semibold text-gray-900">
                  {brandPointBalance?.allBrandPointsEarned?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">All time points Redeemed</p>
                <p className="text-sm font-semibold text-gray-900">
                  {brandPointBalance?.allBrandPointsRedeemed?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}