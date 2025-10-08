import AddDealAndPromo from "@/components/admin/deals-and-promo/add-deal-and-promot";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Add Deal & Promo',
  description: 'Add Deal & Promo',
}


export default function Page() {
  return <AddDealAndPromo />;
}