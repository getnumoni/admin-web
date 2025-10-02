'use client';

import { Gift, Star, Store, Ticket, Users } from 'lucide-react';
import ActiveUsersCard from './active-users-card';
import MostSupportedCharity from './most-supported-charity';
import TopPerformingMerchant from './top-performing-merchant';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const MetricCard = ({ title, value, change, changeType, icon, bgColor, iconBgColor }: MetricCardProps) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-xs border border-gray-100`}>
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className={`${iconBgColor} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
          {icon}
        </div>

        {/* Title */}
        <p className="text-md font-medium text-gray-600 mt-6 mb-3">{title}</p>

        {/* Value and Change - Always at bottom */}
        <div className="flex items-baseline gap-2 mt-auto">
          <p className="text-2xl font-extrabold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const metrics = [
    {
      title: 'Total Customers',
      value: '200',
      change: '+55%',
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#E3EAFD]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Merchants',
      value: '234',
      change: '-14%',
      changeType: 'negative' as const,
      icon: <Store className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#DFFDDB]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Donations',
      value: '90M',
      icon: <Gift className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Points Issued',
      value: '900.3M',
      icon: <Star className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Points Redeemed',
      value: '900.3K',
      icon: <Gift className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Open Tickets',
      value: '200',
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
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            bgColor={metric.bgColor}
            iconBgColor={metric.iconBgColor}
          />
        ))}
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