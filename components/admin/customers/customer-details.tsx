"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetCustomerDetailsById from "@/hooks/query/useGetCustomerDetailsById";
import { useState } from "react";
import CustomerHeader from "./customer-header";
import CustomersTabs from "./customers-tab";

export default function CustomerDetails({ customerId }: { customerId: string }) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isPending, error, isError, refetch } = useGetCustomerDetailsById({ customerId });

  // console.log(data?.data?.data?.data);
  const customerData = data?.data?.data?.data;

  if (isPending) {
    return <LoadingSpinner message="Loading customer details..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Customers</h3>
          <p className="text-gray-600 mb-4">
            {error?.message || "There was an error loading the customer data. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-theme-dark-green text-white rounded-lg hover:bg-theme-dark-green/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return <div className="min-h-screen bg-gray-50 p-3">
    <div className="max-w-7xl mx-auto">
      <CustomerHeader
        customerName={customerData?.name}
        customerId={customerData?.userId}
        level={data?.data?.level}
      />

      <CustomersTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  </div>;
}