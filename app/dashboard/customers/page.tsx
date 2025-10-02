import Customers from "@/components/admin/customers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Customers',
}

export default function Page() {
  return <Customers />
}