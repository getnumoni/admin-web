"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetCharityDetailsById from "@/hooks/query/useGetCharityDetailsById";
import { useState } from "react";
import CharityAccountInfo from "./charity-account-info";
import CharityDescription from "./charity-description";
import CharityHeader from "./charity-header";
import CharityPersonalInfo from "./charity-personal-info";
import CharityTabs from "./charity-tabs";

export default function CharityDetails({ charityId }: { charityId: string }) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isPending, error, isError, refetch } = useGetCharityDetailsById({ charityId });

  // const { data: brandsData, isPending: brandsPending, error: brandsError, isError: brandsIsError, refetch: brandsRefetch } = useGetBrandByCharity({ charityId });

  // console.log('brandsData', brandsData);

  const charityData = data?.data?.data;

  if (isPending) {
    return <LoadingSpinner message="Loading charity details..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Charity</h3>
          <p className="text-gray-600 mb-4">
            {error?.message || "There was an error loading the charity data. Please try again."}
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

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-7xl mx-auto">
        <CharityHeader
          charityName={charityData?.charityName}
          charityId={charityData?.id}
          logoUrl={charityData?.logoUrl}
          status={charityData?.status}
        />

        <CharityTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CharityPersonalInfo
                charityName={charityData?.charityName || ""}
                contactEmail={charityData?.contactEmail || ""}
                contactPhoneNumber={charityData?.contactPhoneNumber || ""}
                charityAddress={charityData?.charityAddress || ""}
                contactPersonName={charityData?.contactPersonName || ""}
                bankName={charityData?.bankName || ""}
                bankAccountNumber={charityData?.bankAccountNumber || ""}
                accountName={charityData?.accountName || ""}
                description={charityData?.description || ""}
                charityRegNumber={charityData?.charityRegNumber || ""}
              />
              <CharityAccountInfo
                dateAdded={charityData?.dateAdded || ""}
                lastLogin={charityData?.lastLogin}
                status={charityData?.status || "ACTIVE"}
                totalPointDonated={charityData?.totalPointDonated || 0}
                numberOfDonations={charityData?.numberOfDonations || 0}
                country={charityData?.country || ""}
                state={charityData?.state || ""}
                city={charityData?.city || ""}
              />
            </div>
            <CharityDescription description={charityData?.description || ""} />
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h2>
            <p className="text-gray-600">Transaction history will be displayed here.</p>
          </div>
        )}

        {activeTab === "reward-points" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reward & Points</h2>
            <p className="text-gray-600">Reward points information will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}