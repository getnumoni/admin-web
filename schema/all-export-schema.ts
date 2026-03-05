import z from "zod";

const exportMerchantTransactionSchema = z.object({
  businessName: z.string().optional(),
  merchantEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  merchantPhoneNo: z.string().optional(),
  merchantId: z.string().optional(),
  approvalStatus: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
});

const exportPosSchema = z.object({
  merchantId: z.string().optional(),
  branchId: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
})

const exportCustomerSharePointSchema = z.object({
  customerId: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
});


const exportDealListSchema = z.object({
  status: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
})

const exportCharityListSchema = z.object({
  status: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
})

const exportPurchaseTransactionSchema = z.object({
  dealName: z.string().optional(),
  dealId: z.string().optional(),
  transactionId: z.string().optional(),
  purchaseId: z.string().optional(),
  customerName: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
})

const exportCustomerListSchema = z.object({
  customerName: z.string().optional(),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerPhoneNo: z.string().optional(),
  customerId: z.string().optional(),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),
})

export {
  exportCharityListSchema, exportCustomerListSchema, exportCustomerSharePointSchema, exportDealListSchema, exportMerchantTransactionSchema,
  exportPosSchema, exportPurchaseTransactionSchema
};

