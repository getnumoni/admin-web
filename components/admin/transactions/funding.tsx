import FundingCard from "./funding-card";
import FundingTable from "./funding-table";

export default function FundingLanding() {
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        <FundingCard />
        <FundingTable />
      </div>
    </div>
  );
}