import CharityTransactions from "@/components/admin/charity/charity-transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity Transactions",
  description: "Charity Transactions",
}

export default function Page() {
  return (
    <CharityTransactions />
  );
}