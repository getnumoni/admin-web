'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useGetDashboardInfo from '@/hooks/query/useGetDashboardInfo';
import useGetTotalDonation from '@/hooks/query/useGetTotalDonation';
import useGetTotalIssuedPoints from '@/hooks/query/useGetTotalIssuedPoints';
import useGetTotalRedeemedPoints from '@/hooks/query/useGetTotalRedeemedPoints';
import { getCurrentDate, getMetricErrorState, getMetricLoadingState } from '@/lib/helper';
import { Gift, Star, Store, Ticket, Users } from 'lucide-react';
import { MetricCard } from '../common/metric-card';
import ActiveUsersCard from './active-users-card';
import MostSupportedCharity from './most-supported-charity';
import TopPerformingMerchant from './top-performing-merchant';


export default function Admin() {
  const fromDate = getCurrentDate('dd-mm-yyyy') as string;
  const toDate = getCurrentDate('dd-mm-yyyy') as string;
  const { data: totalPoints, isPending: totalPointsPending, error: totalPointsError } = useGetTotalIssuedPoints();
  const { data: totalDonation, isPending: totalDonationPending, error: totalDonationError } = useGetTotalDonation();
  const { data: totalRedeemedPoints, isPending: totalRedeemedPointsPending, error: totalRedeemedPointsError } = useGetTotalRedeemedPoints();
  const { data: dashboardInfo } = useGetDashboardInfo({ fromDate, toDate });


  const dashboardData = dashboardInfo?.data?.data;



  const totalIssuedPoints = totalPoints?.data?.totalIssuedPoints || '0';
  const totalDonations = totalDonation?.data?.data?.totalDonations || '0';
  const totalRedeemedPoint = totalRedeemedPoints?.data?.data?.totalPoints || '0';

  // Create a map of metric states for the helper functions
  const metricStates = {
    'Total Points Issued': { isPending: totalPointsPending, error: totalPointsError },
    'Total Donations': { isPending: totalDonationPending, error: totalDonationError },
    'Total Points Redeemed': { isPending: totalRedeemedPointsPending, error: totalRedeemedPointsError },
  };

  const metrics = [
    {
      title: 'Total Customers',
      value: dashboardData?.customers?.totalCustomers || '0',
      // change: '+55%',
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#E3EAFD]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Merchants',
      value: dashboardData?.merchants?.totalMerchants || '0',
      // change: '-14%',
      changeType: 'negative' as const,
      icon: <Store className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#DFFDDB]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Donations',
      value: totalDonations,
      icon: <Gift className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Points Issued',
      value: totalIssuedPoints,
      icon: <Star className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Points Redeemed',
      value: totalRedeemedPoint,
      icon: <Gift className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Open Tickets',
      value: dashboardData?.tickets?.totalTickets || '0',
      icon: <Ticket className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFDADC]',
      iconBgColor: 'bg-black'
    }
  ];

  return (
    <div className="p-3">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your platform metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {metrics.map((metric, index) => {
          const isMetricPending = getMetricLoadingState(metric.title, metricStates);
          const isMetricError = getMetricErrorState(metric.title, metricStates);

          if (isMetricPending) {
            return (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-32" />
              </div>
            );
          }

          return (
            <MetricCard
              key={index}
              title={metric.title}
              value={isMetricError ? 'Error' : metric.value}
              // change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              bgColor={metric.bgColor}
              iconBgColor={metric.iconBgColor}
            />
          );
        })}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
        <ActiveUsersCard />
        <div className="flex flex-col gap-6">
          <TopPerformingMerchant />
          <MostSupportedCharity />
        </div>
      </div>
    </div>
  );
}