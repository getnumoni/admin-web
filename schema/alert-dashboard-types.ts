export interface RapidTransfer {
  customerId: string;
  count: number;
  startTime: string;
  endTime: string;
}

export interface LargeTransaction {
  date: string;
  amount: number;
  customerId: string;
  transactionId: string;
  status: string;
}

export interface DuplicateWallet {
  customerIds: string[];
  type: 'email' | 'phoneNumber';
  value: string;
}

export interface AlertDashboardData {
  rapidTransfers: RapidTransfer[];
  largeTransactions: LargeTransaction[];
  duplicateWallets: DuplicateWallet[];
}

export interface AlertDashboardResponse {
  success: boolean;
  data: AlertDashboardData;
  message: string;
}
