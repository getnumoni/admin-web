import ViewMerchants from "@/components/admin/add-merchants/view-merchants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchants",
  description: "Merchants"
}

export default function Page() {
  return <ViewMerchants />;
}