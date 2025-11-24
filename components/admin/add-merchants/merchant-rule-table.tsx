"use client";

import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetMerchantRewardById from "@/hooks/query/useGetMerchantRewardById";

export interface RewardRule {
  id: string;
  minSpend: number;
  maxSpend: number | 'Above';
  rewardPercentage: number;
}

export const merchantRewardRules: RewardRule[] = [
  { id: '1', minSpend: 1, maxSpend: 999, rewardPercentage: 0 },
  { id: '2', minSpend: 1000, maxSpend: 9999, rewardPercentage: 20 },
  { id: '3', minSpend: 10000, maxSpend: 99999, rewardPercentage: 20 },
  { id: '4', minSpend: 10000, maxSpend: 99999, rewardPercentage: 30 },
  { id: '5', minSpend: 100000, maxSpend: 999999, rewardPercentage: 70 },
  { id: '6', minSpend: 100000, maxSpend: 999999, rewardPercentage: 80 },
  { id: '7', minSpend: 100000, maxSpend: 999999, rewardPercentage: 90 },
  { id: '8', minSpend: 1000000, maxSpend: 'Above', rewardPercentage: 100 },
];

export default function MerchantRuleTable({ merchantId }: { merchantId: string }) {
  const { data: rewardData, isPending: isRewardPending, isError: isRewardError, error: rewardError, refetch } = useGetMerchantRewardById({ merchantId });
  console.log(rewardData?.data);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // const handleEditRule = (ruleId: string) => {
  //   console.log('Edit rule:', ruleId);
  // };

  // const handleDeleteRule = (ruleId: string) => {
  //   console.log('Delete rule:', ruleId);
  // };

  // const handleAddRule = () => {
  //   console.log('Add new rule');
  // };

  if (isRewardPending) {
    return <LoadingSpinner message="Loading reward rules..." />;
  }

  if (isRewardError) {
    return <ErrorState title="Error Loading Reward" message={rewardError?.message || "Failed to load reward. Please try again."}
      onRetry={refetch}
      retryText="Retry"
    />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900">Min Spend</TableHead>
              <TableHead className="font-semibold text-gray-900">Max Spend</TableHead>
              <TableHead className="font-semibold text-gray-900">Reward Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchantRewardRules.map((rule) => (
              <TableRow key={rule.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {formatCurrency(rule.minSpend)}
                </TableCell>
                <TableCell className="text-gray-900">
                  {rule.maxSpend === 'Above' ? 'Above' : formatCurrency(rule.maxSpend)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${rule.rewardPercentage === 0
                      ? 'bg-gray-100 text-gray-800'
                      : rule.rewardPercentage >= 70
                        ? 'bg-green-100 text-green-800'
                        : rule.rewardPercentage >= 30
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {rule.rewardPercentage}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


    </div>
  );
}