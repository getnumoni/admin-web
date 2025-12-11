import AddSponsoredDeals from "@/components/admin/deals-and-promo/add-sponsored-deals";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Add Sponsored Deal',
  description: 'Add Sponsored Deal',
}

export default function Page() {
  return (
    <AddSponsoredDeals />
  );
}