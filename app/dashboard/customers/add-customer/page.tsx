import AddCustomers from "@/components/admin/customers/add-customers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Customers',
  description: 'Add Customers',
}


export default function Page() {
  return <AddCustomers />
}