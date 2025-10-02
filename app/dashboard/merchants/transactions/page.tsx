import MerchantTransactions from "@/components/admin/add-merchants/merchant-transactions";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Merchants Transactions ",
  description: "Merchants Transactions"
}
export default function Page() {
  return <MerchantTransactions />;
} 