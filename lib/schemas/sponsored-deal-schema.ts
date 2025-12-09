import { z } from 'zod';

export const sponsoredDealSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(100, 'Heading must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  dealId: z.string().optional(),
  isActive: z.boolean(),
});

export type SponsoredDealFormData = z.infer<typeof sponsoredDealSchema>;

