import AddAdmin from "@/components/admin/admin-management/add-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Admin",
  description: "Add Admin",
}

export default function Page() {
  return <AddAdmin />
}