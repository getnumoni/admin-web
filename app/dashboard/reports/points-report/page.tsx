import ViewPointsReport from "@/components/admin/reports/view-points-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Points Report",
  description: "Points Report",
}

export default function Page() {
  return <ViewPointsReport />;
} 