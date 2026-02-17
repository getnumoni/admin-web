export type RewardRule = {
  minSpend: number;
  maxSpend: number;
  rewardValue: number;
}

export type Reward = {
  id: string;
  merchantId: string;
  rewardType: "PERCENTAGE_BASED" | "FIXED_POINTS";
  rules: RewardRule[];
  rewardCap: number;
  rewardDistributed: number;
  availableRewards: number;
  redeemRewards: number;
  distributionType: string;
  milestoneTarget: number;
  pointExpirationDays: number;
  status: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isFreezed: boolean;
  reason: string | null;
  expireDate: string | null;
  resonForAdjustments: string | null;
}
