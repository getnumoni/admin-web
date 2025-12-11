import FundingLanding from "@/components/admin/transactions/funding";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Funding",
  description: "Funding",
}
export default function Funding() {
  return <FundingLanding />;
}