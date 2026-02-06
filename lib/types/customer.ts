export type Customer = {
  customerId: string;
  userId: string;
  customer: string | null;
  dateJoined: string;
  emailAddress: string;
  phoneNumber: string;
  address: string | null;
  walletBalance: string;
  city: string | null;
  street: string | null;
  kycStatus: string | null;
};

export type CustomerApiResponse = {
  success: boolean;
  message: string;
  data: {
    totalPages: number;
    totalRows: number;
    currentPage: number;
    pageData: Customer[];
  };
};
