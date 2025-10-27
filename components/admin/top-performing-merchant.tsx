'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useGetTopMerchants from "@/hooks/query/useGetTopMerchants";
import { formatCurrency } from "@/lib/helper";
import Image from "next/image";

interface TopPerformingMerchant {
  merchantId: string;
  totalRewardDistributed: number;
  merchantName: string;
  businessImage: string;
}

export default function TopPerformingMerchant() {
  const { data: topMerchants, isPending: topMerchantsPending } = useGetTopMerchants();

  const merchants = topMerchants?.data?.data || [];

  if (topMerchantsPending) {
    return (
      <div className="bg-white rounded-xl p-3 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2 flex-1">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">Top Performing Merchants</h3>
      </div>

      <div className="space-y-1 max-h-60 overflow-y-auto">
        {merchants.map((merchant: TopPerformingMerchant) => (
          <div key={merchant.merchantId} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm overflow-hidden">
                <Image
                  src={merchant.businessImage || '/default-merchant.png'}
                  alt={merchant.merchantName}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs">{merchant.merchantName}</p>
                <p className="text-xs text-gray-500">{formatCurrency(merchant.totalRewardDistributed)} Points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}