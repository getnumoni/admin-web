import { z } from 'zod';

export const adminSchema = z.object({
  // Profile
  profileImage: z.string().optional(),

  // Basic Information
  fullName: z.string().min(1, 'Full name is required'),
  emailAddress: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  roleType: z.string().min(1, 'Role type is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),

  // Notification Preference
  notifyByEmail: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type AdminFormData = z.infer<typeof adminSchema>;

// Dropdown options
export const roleTypes = [
  'Super Admin',
  'Admin',
  'Manager',
  'Support',
  'Viewer'
];
