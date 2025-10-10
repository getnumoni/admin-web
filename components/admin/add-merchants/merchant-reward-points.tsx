import { MetricCard } from "@/components/common/metric-card";
import { Button } from "@/components/ui/button";
import { Edit, Store } from "lucide-react";
import MerchantRuleCard from "./merchant-rule-card";
import MerchantRuleTable from "./merchant-rule-table";
import PointAllocationCard from "./point-allocation-card";

const metrics = [
  {
    title: 'Total Points Allocated',
    value: '200',
    change: '+55%',
    changeType: 'positive' as const,
    icon: <Store className="h-6 w-6 text-gray-200" />,
    bgColor: 'bg-[#E3EAFD]',
    iconBgColor: 'bg-black'
  },
  {
    title: 'Total Points Redeemed',
    value: '90M',
    icon: <Store className="h-6 w-6 text-gray-200" />,
    bgColor: 'bg-[#FFFBDA]',
    iconBgColor: 'bg-black'
  },
  {
    title: 'Point Balance',
    value: '900.3M',
    icon: <Store className="h-6 w-6 text-gray-200" />,
    bgColor: 'bg-[#FFFBDA]',
    iconBgColor: 'bg-black'
  },
];


export default function MerchantRewardPoints() {
  return (
    <main>

      {/* reward overview */}
      <div className="bg-white rounded-lg border border-gray-100 ">
        <h3 className="text-lg font-semibold text-gray-900 p-4 ">Reward Overview</h3>
        <hr />

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </div>

      {/* reward insights and */}
      <div className="bg-white rounded-lg border border-gray-100 my-4">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 ">Reward Insights and Rules</h3>
          <div>
            <Button
              variant={"outline"}
              size="lg"
              className="mr-2 text-theme-dark-green border-none shadow-none">
              <Edit className="h-4 w-4" />
              Edit Section
            </Button>
            <Button variant="outline" size="lg"
              className="text-white border-none shadow-none bg-theme-dark-green">

              Add Rule
            </Button>
          </div>

        </div>
        <hr />
        {/* reward insights and rules table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <MerchantRuleTable />
          <MerchantRuleCard />
        </div>
      </div>

      {/* points allocation */}
      <div className="bg-white rounded-lg border border-gray-100 my-4">
        <h3 className="text-lg font-semibold text-gray-900 p-4 ">Points Allocation</h3>
        <hr />

        <div className="p-4">
          <PointAllocationCard />
        </div>
      </div>
    </main>
  );
}