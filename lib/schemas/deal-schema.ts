import { z } from 'zod';

export const dealSchema = z.object({
  dealsTitle: z.string().min(1, 'Deals title is required').max(100, 'Title must be less than 100 characters'),
  brandsMerchants: z.string().min(1, 'Brand/Merchant selection is required'),
  dealType: z.string().min(1, 'Deal type is required'),
  dealCategory: z.array(z.string()).min(1, 'At least one deal category must be selected'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  availableStock: z.string().min(1, 'Available stock is required').regex(/^\d+$/, 'Stock must be a number'),

  // Discount-specific fields
  oldPrice: z.number().optional(),
  discountPercent: z.string().optional(),
  newPrice: z.number().optional(),

  // Bundle-specific fields
  qualifyingPurchase: z.string().optional(),
  rewardItemQuantity: z.string().optional(),
  pricePerItem: z.number().optional(),

  products: z.array(z.string()).optional(),
  targetLocation: z.array(z.string()).optional(),
  dealsDescription: z.string().min(1, 'Deal description is required').max(250, 'Description must be less than 250 characters'),
  sendNotification: z.enum(['yes', 'no']),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate > startDate;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
}).refine((data) => {
  // Only validate oldPrice when dealType is 'Discount' and field has been touched
  if (data.dealType !== 'Discount') {
    return true;
  }

  // Only validate if oldPrice has been touched (not 0 or undefined)
  if (data.oldPrice === undefined || data.oldPrice === 0) {
    return true;
  }

  // If oldPrice has been touched, it must be valid
  return data.oldPrice > 0;
}, {
  message: "Old price is required for discount deals",
  path: ["oldPrice"],
}).refine((data) => {
  // Only validate discountPercent when dealType is 'Discount' and field has been touched
  if (data.dealType !== 'Discount') {
    return true;
  }

  // Only validate if discountPercent has been touched
  if (!data.discountPercent || data.discountPercent.trim().length === 0) {
    return true;
  }

  // If discountPercent has been touched, it must be valid
  return data.discountPercent.trim().length > 0;
}, {
  message: "Discount percentage is required for discount deals",
  path: ["discountPercent"],
}).refine((data) => {
  // Only validate newPrice when dealType is 'Discount' and field has been touched
  if (data.dealType !== 'Discount') {
    return true;
  }

  // Only validate if newPrice has been touched (not 0 or undefined)
  if (data.newPrice === undefined || data.newPrice === 0) {
    return true;
  }

  // If newPrice has been touched, it must be valid
  return data.newPrice > 0;
}, {
  message: "New price is required for discount deals",
  path: ["newPrice"],
}).refine((data) => {
  // Only validate qualifyingPurchase when dealType is 'Bundle' and field has been touched
  if (data.dealType !== 'Bundle') {
    return true;
  }

  // Only validate if qualifyingPurchase has been touched
  if (!data.qualifyingPurchase || data.qualifyingPurchase.trim().length === 0) {
    return true;
  }

  // If qualifyingPurchase has been touched, it must be valid
  return data.qualifyingPurchase.trim().length > 0;
}, {
  message: "Qualifying purchase is required for bundle deals",
  path: ["qualifyingPurchase"],
}).refine((data) => {
  // Only validate rewardItemQuantity when dealType is 'Bundle' and field has been touched
  if (data.dealType !== 'Bundle') {
    return true;
  }

  // Only validate if rewardItemQuantity has been touched
  if (!data.rewardItemQuantity || data.rewardItemQuantity.trim().length === 0) {
    return true;
  }

  // If rewardItemQuantity has been touched, it must be valid
  return data.rewardItemQuantity.trim().length > 0;
}, {
  message: "Reward item quantity is required for bundle deals",
  path: ["rewardItemQuantity"],
}).refine((data) => {
  // Only validate pricePerItem when dealType is 'Bundle' and field has been touched
  if (data.dealType !== 'Bundle') {
    return true;
  }

  // Only validate if pricePerItem has been touched (not 0 or undefined)
  if (data.pricePerItem === undefined || data.pricePerItem === 0) {
    return true;
  }

  // If pricePerItem has been touched, it must be valid
  return data.pricePerItem > 0;
}, {
  message: "Price per item is required for bundle deals",
  path: ["pricePerItem"],
});

export type DealFormData = z.infer<typeof dealSchema>;

// Mock data for dropdowns
export const dealTypeOptions = [
  { value: 'Discount', label: 'Discount' },
  { value: 'Bundle', label: 'Bundle' },
];

export const categoryOptions = [
  { value: 'supermarket', label: 'Supermarket' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'salon', label: 'Salon' },
  { value: 'cinema', label: 'Cinema' },
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
