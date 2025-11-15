import { MetricCard } from "@/components/common/metric-card";
import { DollarSign, Gift, ShoppingCart, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

function FundingMetricCard({ fundingMetrics }: { fundingMetrics: Array<{ title: string; value: number | string; icon: ReactNode; bgColor: string; iconBgColor: string; }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {fundingMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={String(metric.value)}
          icon={metric.icon}
          bgColor={metric.bgColor}
          iconBgColor={metric.iconBgColor}
        />
      ))}
    </div>
  );
}

export default function FundingCard() {
  // Dummy data for funding metrics
  const fundingMetrics = [
    {
      title: "Total Funding",
      value: "₦2,000",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Number of Funding",
      value: "1",
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Number of Points Issued",
      value: "100",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Bonus Issued",
      value: "5%",
      icon: <Gift className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];

  return <FundingMetricCard fundingMetrics={fundingMetrics} />;
}