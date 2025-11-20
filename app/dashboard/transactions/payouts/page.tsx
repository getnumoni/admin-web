import PayoutList from "@/components/admin/transactions/payout-list";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Payouts",
  description: "Payouts",
}
export default function Payouts() {
  return <PayoutList />;
}