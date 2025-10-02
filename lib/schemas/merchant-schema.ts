import { z } from 'zod';

export const merchantSchema = z.object({
  // Profile
  profileImage: z.string().optional(),

  // Business Information
  businessName: z.string().min(1, 'Business name is required'),
  emailAddress: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  businessCategory: z.string().min(1, 'Business category is required'),
  rcNumber: z.string().regex(/^RC[A-Z0-9]+$/i, 'RC number must start with "RC" followed by alphanumeric characters'),
  businessType: z.string().min(1, 'Business type is required'),
  headquarterAddress: z.string().min(1, 'Headquarter address is required'),
  country: z.string().min(1, 'Country is required'),
  region: z.string().min(1, 'Region is required'),
  state: z.string().min(1, 'State is required'),
  lga: z.string().min(1, 'LGA is required'),
  businessDescription: z.string().min(10, 'Business description must be at least 10 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),

  // Contact Information
  contactPersonName: z.string().min(1, 'Contact person name is required'),
  contactEmailAddress: z.string().email('Invalid contact email address'),
  contactPhoneNumber: z.string().min(10, 'Contact phone number must be at least 10 digits'),
  contactAddress: z.string().min(1, 'Contact address is required'),
  contactRegion: z.string().min(1, 'Contact region is required'),
  contactState: z.string().min(1, 'Contact state is required'),
  contactLga: z.string().min(1, 'Contact LGA is required'),

  // Payout Information
  bankName: z.string().min(1, 'Bank name is required'),
  bankCode: z.string().min(1, 'Bank code is required'),
  bankAccountNumber: z.string().min(10, 'Bank account number must be at least 10 digits'),
  accountName: z.string().min(1, 'Account name is required'),
  verifiedAccountName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type MerchantFormData = z.infer<typeof merchantSchema>;

// Dropdown options
export const businessCategories = [
  'Fashion',
  'Home Appliances',
  'Gadgets',
  'Toiletries',
  'Electronics',
  'Food & Beverage',
  'Health & Beauty',
  'Sports & Fitness',
  'Books & Media',
  'Automotive',
  'Home & Garden',
  'Office Supplies'
];

export const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company',
  'Corporation',
  'S-Corporation',
  'Non-Profit Organization',
  'Cooperative',
  'Franchise'
];

export const countries = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Japan'
];

export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const banks = [
  'Access Bank',
  'Citibank',
  'Diamond Bank',
  'Ecobank',
  'Fidelity Bank',
  'First Bank of Nigeria',
  'First City Monument Bank',
  'Guaranty Trust Bank',
  'Heritage Bank',
  'Keystone Bank',
  'Kuda Bank',
  'Opay',
  'PalmPay',
  'Polaris Bank',
  'Providus Bank',
  'Stanbic IBTC Bank',
  'Standard Chartered Bank',
  'Sterling Bank',
  'Suntrust Bank',
  'Union Bank of Nigeria',
  'United Bank for Africa',
  'VFD Microfinance Bank',
  'Wema Bank',
  'Zenith Bank'
];
