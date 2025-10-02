// API payload type for creating a branch
export interface CreateBranchPayload {
  name: string;
  state: string;
  region: string;
  lga: string;
  openingTime: string;
  closingTime: string;
  description: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  managerId: string;
  latitude?: string;
  longitude?: string;
  website?: string;
  whatsApp?: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountName: string;
  minimumPaymentAmount: string;
  logo?: File;
  images?: File[];
  managerProfilePhoto?: File;
}


export interface UpdateBranchPayload {
  name: string;
  state: string;
  region: string;
  lga: string;
  branchId: string;
  openingTime: string;
  closingTime: string;
  description: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  managerId: string;
  latitude?: string;
  longitude?: string;
  website?: string;
  whatsApp?: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountName: string;
  minimumPaymentAmount: string;
  logo?: File;
  images?: File[];
  managerProfilePhoto?: File;
}



// API response type for branch creation
export interface CreateBranchResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    state: string;
    region: string;
    lga: string;
    // Add other response fields as needed
  };
}

export interface UpdateBranchResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    state: string;
    region: string;
    lga: string;
    // Add other response fields as needed
  };
}
// Branch data type (for API responses and component props)
export interface BranchData {
  id: string;
  name: string;
  logo?: string;
  region: string;
  state: string;
  lga: string;
  openingTime: string;
  closingTime: string;
  description: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  city?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
  website?: string;
  whatsApp?: string;
  linkedin?: string;
  instagram?: string;
  x?: string; // Twitter/X
  snapchat?: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountName: string;
  minimumPaymentAmount: string;
  images?: string[];
  managerProfilePhoto?: string;
  managerDetails?: {
    name: string;
    phone: string;
    email: string;
  };
  status?: string;
  merchantId?: string;
  managerId?: string;
}

// Error response type
export interface BranchApiError {
  response?: {
    data?: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
}
