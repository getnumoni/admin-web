import { z } from 'zod';

export const dealSchema = z.object({
  dealsTitle: z.string().min(1, 'Deals title is required').max(100, 'Title must be less than 100 characters'),
  brandsMerchants: z.string().min(1, 'Brand/Merchant selection is required'),
  dealType: z.string().min(1, 'Deal type is required'),
  dealCategory: z.string().min(1, 'Deal category is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  availableStock: z.string().min(1, 'Available stock is required').regex(/^\d+$/, 'Stock must be a number'),
  oldPrice: z.string().min(1, 'Old price is required').regex(/^\d+$/, 'Price must be a number'),
  discountPercent: z.string().min(1, 'Discount percentage is required').regex(/^\d+%?$/, 'Invalid discount format'),
  newPrice: z.string().min(1, 'New price is required').regex(/^\d+$/, 'Price must be a number'),
  products: z.array(z.string()).min(1, 'At least one product must be selected'),
  targetLocation: z.array(z.string()).min(1, 'At least one location must be selected'),
  dealsDescription: z.string().min(1, 'Deal description is required').max(250, 'Description must be less than 250 characters'),
  sendNotification: z.enum(['yes', 'no']),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate > startDate;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export type DealFormData = z.infer<typeof dealSchema>;

// Mock data for dropdowns
export const dealTypeOptions = [
  { value: 'Discount', label: 'Discount' },
  { value: 'Buy One Get One', label: 'Buy One Get One' },
  { value: 'Free Shipping', label: 'Free Shipping' },
];

export const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food & Beverages' },
];

export const productOptions = [
  { value: 'bule-egba', label: 'Bule Egba' },
  { value: 'ikeja', label: 'Ikeja' },
  { value: 'victoria-island', label: 'Victoria Island' },
  { value: 'lekki', label: 'Lekki' },
];

export const locationOptions = [
  { value: 'bule-egba', label: 'Bule Egba' },
  { value: 'ikeja', label: 'Ikeja' },
  { value: 'victoria-island', label: 'Victoria Island' },
  { value: 'lekki', label: 'Lekki' },
];

export const brandOptions = [
  { value: 'brand1', label: 'Brand 1' },
  { value: 'brand2', label: 'Brand 2' },
  { value: 'brand3', label: 'Brand 3' },
];
