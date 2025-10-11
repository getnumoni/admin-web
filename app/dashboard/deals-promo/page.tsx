import ViewDealsPromo from "@/components/admin/deals-and-promo/view-deals-promo";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Deals & Promo',
  description: 'Deals & Promo',
}

export default function Page() {
  return <ViewDealsPromo />;
}