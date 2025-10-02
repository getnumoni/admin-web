import ViewAdmin from "@/components/admin/admin-management/view-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Management",
  description: "Admin Management",
}


export default function Page() {
  return <ViewAdmin />
}