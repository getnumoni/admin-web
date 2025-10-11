import ViewPointsReport from "@/components/admin/deals-and-promo/view-points-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Points Report",
  description: "Points Report",
}

export default function Page() {
  return <ViewPointsReport />;
} 