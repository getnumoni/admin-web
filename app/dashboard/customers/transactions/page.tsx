import Transactions from "@/components/admin/customers/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Transactions',
}

export default function Page() {
  return <Transactions />
}