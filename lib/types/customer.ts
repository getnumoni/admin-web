export type Customer = {
  customerId: string;
  customer: string;
  dateJoined: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
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
