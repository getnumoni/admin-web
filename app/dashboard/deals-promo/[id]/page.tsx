import DealDetails from "@/components/admin/deals-and-promo/deal-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Deal Details',
  description: 'Deal Details',
}


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <DealDetails dealId={id} />;
}