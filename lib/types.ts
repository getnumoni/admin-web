import { ComponentType, ReactNode } from "react";


type TanstackProviderProps = {
  children: ReactNode
}

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
}

type DashboardProps = {
  brandName?: string;
  merchantId?: string;
  logoUrl?: string;
  qrCodeUrl?: string;
  qrTitle?: string;
  qrDescription?: string;
  summaryContent?: ReactNode;
  onAccountSettings?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

type BrandSummaryProps = {
  title?: string;
  subtitle?: string;
  onboardedBranches?: number;
  availableBrandPoints?: string;
  totalCustomers?: string;
}

type QRCodeCardProps = {
  qrCodeUrl?: string;
  title?: string;
  description?: string;
  onDownload?: () => void;
  onShare?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

type BrandProfileProps = {
  brandName?: string;
  merchantId?: string;
  logoUrl?: string;
  onAccountSettings?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

type SummaryItem = {
  label: string;
  value: string;
  color: 'green' | 'red' | 'gray';
}

type MainBranchSummaryProps = {
  title?: string;
  items?: SummaryItem[];
}

type BranchSummaryData = {
  id: string;
  merchantName: string;
  merchantId: string;
  merchantLogo: string;
  status: 'active' | 'closed' | 'pending';
  todayTransactions: {
    allocatedBudget: number;
    amountSpent: number;
    fees: number;
  };
}

type Branch = {
  branchId: string;
  merchantId: string;
  name: string;
  logo: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  totalAmountRecieved?: number;
  totalPayout?: number;
  fees?: number;
}

type GetBranchesResponse = {
  data: Branch[];
  success: boolean;
  count: number;
  message: string;
  accessedBy: string;
}

type SocialMediaData = {
  whatsApp?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedin?: string | null;
  snapchat?: string | null;
  website?: string | null;
}


type ActiveBranchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

type RewardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  icon?: ReactNode;
  iconColor?: 'red' | 'green' | 'blue' | 'yellow' | 'gray';
  title: string;
  description: string;
  subDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  secondaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

type Customer = {
  totalTransactions: number;
  totalSpent: number;
  mostShoppedBranch: string;
  customerId: string;
  customerName: string;
  rank?: number;
}

type CustomerAnalyticsData = {
  totalTransactions: number;
  totalSpent: number;
  mostShoppedBranch: string;
  customerId: string;
  customerUserId: string;
  customerName: string;
}

type CustomerAnalyticsResponse = {
  topLoyalCustomers: CustomerAnalyticsData[];
  totalCustomers: number;
}

type BranchAnalyticsData = {
  branchId: string;
  branchName: string;
  logo: string;
  totalPointsIssued: number;
}

type CustomerCardProps = {
  customer: Customer;
  rank?: number;
}

type CustomerSectionProps = {
  title: string;
  customers: Customer[];
}


type RewardRulesSectionProps = {
  earnMethod: string;
  minSpending: string;
  setMinSpending: (value: string) => void;
  maxSpending: string;
  setMaxSpending: (value: string) => void;
  rewardPercentage: string;
  setRewardPercentage: (value: string) => void;
  rewardRules: Array<{ min: string, max: string, percentage: string }>;
  setRewardRules: (rules: Array<{ min: string, max: string, percentage: string }>) => void;
  showTable: boolean;
  setShowTable: (show: boolean) => void;
}

type RewardCapSectionProps = {
  rewardCap: string;
  setRewardCap: (value: string) => void;
}

type MilestoneTargetSectionProps = {
  milestoneTarget: string;
  setMilestoneTarget: (value: string) => void;
}

type ReceiveMethodSectionProps = {
  receiveMethod: string;
  setReceiveMethod: (value: string) => void;
}

type ExpirationSectionProps = {
  pointExpiration: string;
  setPointExpiration: (value: string) => void;
}

type DateSectionProps = {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

type signInPayload = {
  username: string;
  password: string;
  usertype: string;
  deviceId: string;
}

type AuthUser = {
  id: string;
  username: string;
  usertype: string;
  roles: string[];
  token: string;
  refreshToken: string;
}

type AuthUserStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logoutInProgress: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  updateTokens: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  setLogoutInProgress: (inProgress: boolean) => void;
}

type CreateRewardsPayload = {
  merchantId: string;
  rewardType: string;
  rules: Array<{
    minSpend: number;
    maxSpend: number;
    rewardValue: number;
  }>;
  rewardCap: number;
  distributionType: string;
  milestoneTarget: number;
  pointExpirationDays: number;
  status: string;
  startDate: string | null;
  endDate: string | null;

}

type UpdateBranchManagerPayload = {
  branchId: string;
  name: string;
  email: string;
  phone: string;
}


type AdminNavigationItem = {
  name: string;
  path?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  children?: AdminNavigationItem[];
  badge?: string;
}

type RewardRule = {
  minSpend: number;
  maxSpend: number;
  rewardValue: number;
};

type Rewards = {
  id: string;
  merchantId: string;
  rewardType: string;
  rules: Array<RewardRule>;
  rewardCap: number;
  distributionType: string;
  milestoneTarget: number;
  pointExpirationDays: number;
  status: string;
  startDate: string | null;
  endDate: string | null;
}

// Axios error type for API error handling
type AxiosError = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
};

// Error display component props
type ErrorDisplayProps = {
  error?: string;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
};

// Point analytics component props
type PointAnalyticsProps = {
  isPending: boolean;
  rewardTableData: Rewards | null;
  errorMessage?: string;
  isError: boolean;
  onRetry?: () => void;
};

type singleBranchDetails = {
  lga: string;
  openingTime: string;
  latitude: string;
  description: string;
  linkedin: string | null;
  instagram: string | null;
  managerProfilePhoto: string;
  snapchat: string | null;
  emailAddress: string;
  closingTime: string;
  merchantId: string;
  logo: string;
  minimumPaymentAmount: string;
  bankAccountNumber: string;
  id: string;
  state: string;
  longitude: string;
  bankAccountName: string;
  bankCode: string;
  images: string[];
  website: string;
  address: string;
  whatsApp: string;
  managerId: string;
  phoneNumber: string;
  totalAmountRecieved: number;
  totalPayout: number;
  fees: number;
  name: string;
  x: string | null;
  region: string;
  status: string;
  managerDetails: {
    name: string;
    email: string;
    phone: string;
  }
}

type BankPayload = {
  secret: string;
  clientId: string;
}

type BankToken = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  expirationTime?: number;
}

type VerifyBankPayload = {
  bankCode: string;
  accountNumber: string;
}

type ChangeBranchStatusPayload = {
  branchId: string;
  status: string;
}

type BranchManagerPayload = {
  name: string
  email: string
  phone: string
}


type UpdateRewardRuleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ruleData: Rewards | null;
}


// Transaction data type based on API response
type Transaction = {
  transactionViewId: string;
  customerId: string;
  merchantId: string;
  merchantName: string;
  merchantImageURl: string | null;
  customername: string;
  customerImageURl: string | null;
  createdDt: string;
  type: string;
  transactionId: string;
  transactionNo: string | null;
  status: string | null;
  trnType: 'C' | 'D';
  amount: number;
}

type InfoItem = {
  label: string;
  value: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isBadge?: boolean;
};

type AccountInformationProps = {
  registrationDate: string;
  lastLogin: string;
  accountType: string;
  accountStatus: "Verified" | "Pending" | "Suspended";
  identityType: string;
  identityNumber: string;
  businessNumber: string;
  maxPointsIssued: string;
}

type CreateCustomersPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  notifyByEmail: boolean;
  password: string;
  preferredLanguage: string;
  address: string;
  lga: string;
  state: string;
  region: string;
  postalCode: string;
}

type CreateMerchantsPayload = {
  businessName: string;
  emailAddress: string;
  phoneNumber: string;
  businessImgPath: string;
  businessCategory: string[];
  rcNumber: string;
  userId: string;
  businessType: string;
  headquartersAddress: string;
  region: string;
  state: string;
  lga: string;
  businessDescription: string;
  password: string;
  confirmPassword: string;
  contactPersonName: string;
  contactEmailAddress: string;
  contactPhoneNumber: string;
  contactAddress: string;
  contactRegion: string;
  contactState: string;
  contactIga: string;
  bankName: string;
  bankAccountNumber: string;
  accountHolderName: string;
}

type MerchantTransaction = {
  merchantName: string;
  merchantId: string;
  transactionId: string;
  date: string;
  time: string;
  type: 'SALES' | 'PAY_OUT' | 'SERVICE_FEE';
  amount: number;
  pointIssued: number | null;
  status: 'SUCCESSFUL' | null;
}


type VerifyPayOnUsBankPayload = {
  institutionCode: string;
  accountNumber: string;
  businessId: string;
}


type CustomerTransaction = {
  customerName: string | null;
  customerId: string | null;
  date: string;
  transactionId: string;
  time: string;
  type: 'PURCHASE' | 'LOAD_MONEY' | 'SHARE_MONEY_DEBIT' | 'SHARE_MONEY_CREDIT' | 'BONUS';
  amount: number;
  pointIssued: number | null;
  status: 'SUCCESSFUL' | null;
};


type MetricCardProps = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}


type CreateCustomerKycPayload = {
  identificationType: string,
  identificationTypeNumber?: string,
  businessRegNo: string,
  cacDocumentPath?: string,
  reqCertificatePath?: string,
  tinNo?: string,
  tinPath?: string,
  menuPath?: string,
  verifiedNin: boolean,
  verifiedTinNo: boolean,
  verifiedCac: boolean
}

type MerchantDetailsResponse = {

  merchantId: string,
  userId: string | null,
  businessName: string,
  brandName: string | null,
  businessImagePath: string | null,
  businessPhoneNo: string | null,
  businessEmail: string,
  qrCode: string | null,
  registeredBusiness: string | null,
  businessReqNo: string | null,
  spendMinimumAmount: number | null,
  sellOffline: boolean | null,
  sellOnline: boolean | null,
  cacDocumentPath: string | null,
  verifiedNin: boolean | null,
  verifiedTin: boolean | null,
  verifiedCac: boolean | null,
  reqCertificatePath: string | null,
  tinNo: string | null,
  tinPath: string | null,
  menuPath: string | null,
  userInformation: string | null,
  menu: string | null,
  "status": "Active",
  averageRating: number | null,
  numberOfReviews: number | null,
  category: string[] | null,
  description: string | null,
  locations: [
    {
      id: string | null,
      userId: string | null,
      storeNo: string | null,
      address: string | null,
      street: string | null,
      city: string | null,
      country: string | null,
      postalCode: string | null,
      latitude: string | null,
      longitude: string | null,
      contactPersonName: string | null,
      contactEmailAddress: string | null,
      contactPhoneNumber: string | null,
      contactAddress: string | null,
      createdDt: string | null,
      updatedDt: string | null,
      active: boolean | null,
    }
  ],
  bankInformation: [
    {
      id: string | null,
      merchantId: string | null,
      bankname: string | null,
      bankcode: string | null,
      accountNo: string | null,
      accountHolderName: string | null,
      bankTransferCode: string | null,
      primary: boolean | null,
      minimumSpentAmount: number | null,
      active: boolean | null,
      createdDt: string | null,
      updatedDt: string | null
    }
  ],
  businessImages: string | null,
  percentage: number | null,
  facebook: string | null,
  instagram: string | null,
  twitter: string | null,
  linkedin: string | null,
  snapchat: string | null,
  website: string | null,
  tiktok: string | null,
  wallet: string | null
}

export type { AccountInformationProps, ActiveBranchModalProps, AdminNavigationItem, AuthUser, AuthUserStore, AxiosError, BankPayload, BankToken, Branch, BranchAnalyticsData, BranchManagerPayload, BranchSummaryData, BrandProfileProps, BrandSummaryProps, ChangeBranchStatusPayload, CreateCustomerKycPayload, CreateCustomersPayload, CreateMerchantsPayload, CreateRewardsPayload, Customer, CustomerAnalyticsData, CustomerAnalyticsResponse, CustomerCardProps, CustomerSectionProps, CustomerTransaction, DashboardProps, DateSectionProps, ErrorDisplayProps, ExpirationSectionProps, GetBranchesResponse, InfoItem, MainBranchSummaryProps, MerchantDetailsResponse, MerchantTransaction, MetricCardProps, MilestoneTargetSectionProps, PointAnalyticsProps, QRCodeCardProps, ReceiveMethodSectionProps, RewardCapSectionProps, RewardModalProps, RewardRule, RewardRulesSectionProps, Rewards, SidebarProps, signInPayload, singleBranchDetails, SocialMediaData, TanstackProviderProps, Transaction, UpdateBranchManagerPayload, UpdateRewardRuleModalProps, VerifyBankPayload, VerifyPayOnUsBankPayload };

