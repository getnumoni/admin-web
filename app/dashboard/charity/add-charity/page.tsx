import AddCharity from "@/components/admin/charity/add-charity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Charity",
  description: "Charity",
}
export default function Page() {
  return <AddCharity />;
}