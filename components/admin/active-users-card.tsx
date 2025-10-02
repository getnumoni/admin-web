'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MousePointer, ShoppingCart, Users, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// Mock data for different time periods
const chartData = {
  daily: [
    { day: 'Mon', users: 120 },
    { day: 'Tue', users: 190 },
    { day: 'Wed', users: 300 },
    { day: 'Thu', users: 500 },
    { day: 'Fri', users: 350 },
    { day: 'Sat', users: 280 },
    { day: 'Sun', users: 200 }
  ],
  weekly: [
    { week: 'Week 1', users: 1200 },
    { week: 'Week 2', users: 1900 },
    { week: 'Week 3', users: 3000 },
    { week: 'Week 4', users: 2500 }
  ],
  monthly: [
    { month: 'Jan', users: 4500 },
    { month: 'Feb', users: 5200 },
    { month: 'Mar', users: 4800 },
    { month: 'Apr', users: 6100 },
    { month: 'May', users: 5800 },
    { month: 'Jun', users: 6700 }
  ],
  yearly: [
    { year: '2021', users: 45000 },
    { year: '2022', users: 52000 },
    { year: '2023', users: 48000 },
    { year: '2024', users: 61000 }
  ]
};

const chartConfig = {
  users: {
    label: "Active Users",
    color: "#10b981"
  }
};

const metrics = [
  { label: 'Users', value: '32,984', icon: Users, progress: 75 },
  { label: 'Clicks', value: '2.42M', icon: MousePointer, progress: 75 },
  { label: 'Sales', value: '₦ 2.3K', icon: ShoppingCart, progress: 35 },
  { label: 'Donations', value: '₦ 8.3K', icon: Wrench, progress: 65 }
];

export default function ActiveUsersCard() {
  const [activeTab, setActiveTab] = useState('weekly');

  const getCurrentData = () => {
    return chartData[activeTab as keyof typeof chartData] || chartData.weekly;
  };

  const getXAxisKey = () => {
    switch (activeTab) {
      case 'daily': return 'day';
      case 'weekly': return 'week';
      case 'monthly': return 'month';
      case 'yearly': return 'year';
      default: return 'day';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6  border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
            <span className="text-sm text-green-600 font-medium">(+23) than last week</span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-72 border border-gray-200 rounded-lg">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value={activeTab} className="mt-0">
            <div className="h-64">
              <ChartContainer config={chartConfig} className="h-full">
                <BarChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey={getXAxisKey()}
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-gray-500"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-gray-500"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="users"
                    fill="var(--color-users)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-theme-dark-green rounded-lg flex items-center justify-center mr-3">
                <metric.icon className="h-3 w-3 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">{metric.label}</p>
            </div>
            <div className="w-full">
              <p className="text-lg font-bold text-gray-900 mb-2">{metric.value}</p>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-theme-dark-green h-1 rounded-full transition-all duration-300"
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}