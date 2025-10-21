import ViewRoles from "@/components/admin/roles-and-permission";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles & Permission",
  description: "Roles & Permission",
}

export default function Page() {
  return <ViewRoles />;
}