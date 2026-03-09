import z from "zod";
import { exportAdminListSchema, exportSignUpBonusListSchema, exportSupportTicketListSchema } from "./all-export-schema";

type ExportAdminListFormData = z.infer<typeof exportAdminListSchema>;

type ExportSupportTicketListFormData = z.infer<typeof exportSupportTicketListSchema>;

type ExportSignUpBonusListFormData = z.infer<typeof exportSignUpBonusListSchema>;


export type {
  ExportAdminListFormData,
  ExportSupportTicketListFormData,
  ExportSignUpBonusListFormData
};
