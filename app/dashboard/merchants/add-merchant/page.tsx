import AddMerchants from "@/components/admin/add-merchants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Merchant',
  description: 'Add Merchant ',
}

export default function Page() {
  return (
    <AddMerchants />
  )
}