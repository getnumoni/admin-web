import { MetricCard } from "@/components/common/metric-card";
import { Gift, ShoppingBag, Star, Users } from "lucide-react";

export default function ViewPointsReport() {
  // Mock data for points report metrics
  const pointsMetrics = [
    {
      title: "Total Points Earned",
      value: "200",
      change: "+55% Up from yesterday",
      changeType: "positive" as const,
      icon: <Users className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Points Redeemed",
      value: "₦ 900.3K",
      change: undefined,
      changeType: undefined,
      icon: <Gift className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Redemption Rate",
      value: "234",
      change: "-14% Down from yesterday",
      changeType: "negative" as const,
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Avg Point Value",
      value: "₦ 90",
      change: "0% Up from yesterday",
      changeType: "positive" as const,
      icon: <Star className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pointsMetrics.map((metric, index) => (
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