export type Customer = {
  customerId: string;
  customer: string | null;
  dateJoined: string;
  emailAddress: string;
  phoneNumber: string;
  address: string | null;
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
