import CharityReport from "@/components/admin/deals-and-promo/charity-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity Report",
  description: "Charity Report",
}

export default function Page() {
  return <CharityReport />;
}