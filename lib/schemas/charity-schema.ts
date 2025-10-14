import { z } from "zod";

export const charitySchema = z.object({
  // Basic Information
  charityName: z.string().min(1, "Charity name is required"),
  charityRegNumber: z.string().min(1, "Registration number is required"),
  charityAddress: z.string().min(1, "Charity address is required"),
  region: z.string().min(1, "Region is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
  city: z.string().min(1, "City is required"),
  associatedBrands: z.array(z.string()).optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  // Media
  logoUrl: z.string().optional(),
  mediaUrls: z.array(z.string()).optional(),

  // Contact Information
  contactPersonName: z.string().min(1, "Contact person name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhoneNumber: z.string().min(1, "Phone number is required"),
  contactAddress: z.string().min(1, "Contact address is required"),
  contactCountry: z.string().min(1, "Contact country is required"),
  contactState: z.string().min(1, "Contact state is required"),
  contactLga: z.string().min(1, "Contact LGA is required"),
  contactCity: z.string().min(1, "Contact city is required"),

  // Payout Information
  bankCode: z.string().min(1, "Bank code is required"),
  bankAccountNumber: z.string().min(1, "Account number is required"),
  accountName: z.string().min(1, "Account name is required"),
  verifiedAccountName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type CharityFormData = z.infer<typeof charitySchema>;
