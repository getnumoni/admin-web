import SponsoredDeal from "@/components/admin/deals-and-promo/sponsored-deal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sponsored Deal',
  description: 'Sponsored Deal',
}

export default function Page() {
  return <SponsoredDeal />;
}