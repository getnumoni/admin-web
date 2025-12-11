"use client";

import SingleTransactionDetails from "@/components/admin/add-merchants/single-transaction-details";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <SingleTransactionDetails transactionId={id as string} />;
}