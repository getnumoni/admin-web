import { z } from 'zod';

export const posBranchSchema = z.object({
  merchantId: z.string().min(1, 'Merchant is required'),
  singleUpload: z.boolean().optional(),
  posBranchFile: z.instanceof(File).optional().or(z.literal('')),
  bankCode: z.string().min(1, 'Bank is required'),
  bankAccountNumber: z.string().min(10, 'Bank account number must be at least 10 digits').max(10, 'Bank account number must not exceed 10 digits'),
  accountName: z.string().optional(),
});

export type PosBranchFormData = z.infer<typeof posBranchSchema>;

