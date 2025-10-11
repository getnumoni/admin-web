import { MetricCard } from "@/components/common/metric-card";
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default function SalesReport() {
  // Mock data for sales report metrics
  const salesMetrics = [
    {
      title: "Total Revenue",
      value: "₦ 2.4M",
      change: "+12.5% Up from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Transactions",
      value: "1,234",
      change: "+8.2% Up from last month",
      changeType: "positive" as const,
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Average Order Value",
      value: "₦ 1,945",
      change: "-3.1% Down from last month",
      changeType: "negative" as const,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5% Up from last month",
      changeType: "positive" as const,
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {salesMetrics.map((metric, index) => (
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


      </div>
    </div>
  );
}