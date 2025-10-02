"use client";


import MerchantDetails from "@/components/admin/add-merchants/merchant-details";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  console.log(id);
  return <MerchantDetails merchantId={id} />;
}