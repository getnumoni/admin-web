import SalesReport from "@/components/admin/reports/sales-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "Reports",
}

export default function Page() {
  return <SalesReport />;
}