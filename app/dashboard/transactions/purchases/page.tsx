import { PurchaseOverview } from "@/components/admin/transactions/purchases-overview";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Purchases",
  description: "Purchases",
}
export default function Purchases() {
  return <PurchaseOverview />
}