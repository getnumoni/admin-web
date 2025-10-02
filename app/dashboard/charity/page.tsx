import Charity from "@/components/admin/charity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity",
  description: "Charity",
}


export default function Page() {
  return <Charity />
}