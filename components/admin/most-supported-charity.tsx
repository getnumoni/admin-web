'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_CHARITY_URL } from '@/constant/routes';
import useGetMostSupportedCharity from '@/hooks/query/useGetMostSupportedCharity';
import { Heart } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

interface MostSupportedCharity {
  image: string;
  name: string;
  donation: string;
  id?: string;
}

interface CharityWithId extends MostSupportedCharity {
  id: string;
}

export default function MostSupportedCharity() {
  const { data: mostSupportedCharity, isPending: mostSupportedCharityPending } = useGetMostSupportedCharity();
  const charities = mostSupportedCharity?.data?.data || [];

  // Add IDs to charities if they don't have them
  const charitiesWithIds: CharityWithId[] = charities.map((charity: MostSupportedCharity, index: number) => ({
    ...charity,
    id: charity.id || `charity-${index}`,
  }));

  // console.log(charitiesWithIds);

  if (mostSupportedCharityPending) {
    return (
      <div className="bg-white rounded-xl p-3 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </div>

        <div className="space-y-1">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2 flex-1">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-gray-200">
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">Most Supported Charities</h3>
        <Heart className="h-3 w-3 text-red-500" />
      </div>

      <div className="space-y-1">
        {charitiesWithIds.map((charity: CharityWithId) => (
          <div key={charity.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm overflow-hidden">
                <Image
                  src={charity.image || '/default-charity.png'}
                  alt={charity.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs">{charity.name}</p>
                <p className="text-xs text-gray-500">{charity.donation} Donation</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200 text-center">
        <Link href={ADMIN_CHARITY_URL} className="w-full text-xs text-blue-600 hover:text-blue-700 text-center font-medium">
          View all charities →
        </Link>
      </div>
    </div>
  );
}