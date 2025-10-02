import { z } from 'zod';

export const customerSchema = z.object({
  // Profile
  profileImage: z.string().optional(),

  // Basic Information
  fullName: z.string().min(1, 'Full name is required'),
  emailAddress: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  preferredLanguage: z.string().min(1, 'Preferred language is required'),
  address: z.string().min(1, 'Address is required'),
  region: z.string().min(1, 'Region is required'),
  state: z.string().min(1, 'State is required'),
  lga: z.string().min(1, 'LGA is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),

  // Notification Preference
  notifyByEmail: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type CustomerFormData = z.infer<typeof customerSchema>;

// Dropdown options
export const genders = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say'
];

export const languages = [
  'English',
  'French',
  'Spanish',
  'Portuguese',
  'Arabic',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Other'
];


