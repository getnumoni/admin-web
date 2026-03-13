import AlertsDashboard from "@/components/admin/alert-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alerts Dashboard",
};

export default function Page() {
  return (
    <AlertsDashboard />
  );
}