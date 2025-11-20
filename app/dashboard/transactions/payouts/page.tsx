import { PayoutCard } from "@/components/admin/transactions/payout-card";
import PayoutList from "@/components/admin/transactions/payout-list";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Payouts",
  description: "Payouts",
}
export default function Payouts() {
  return <main>
    <PayoutCard />
    <PayoutList />
  </main>;
}