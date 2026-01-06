'use client'

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetAllSignupBonusRequest from "@/hooks/query/useGetAllSignupBonusRequest";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { Plus } from "lucide-react";
import { useState } from "react";
import SignUpRequestDialog from "./sign-up-request-dialog";
import { signupBonusRequestColumns, SignupBonusRequestData } from "./signup-bonus-request-columns";
import SignupBonusRequestDataSection from "./signup-bonus-request-data-section";
import SignupBonusRequestPagination from "./signup-bonus-request-pagination";

const ITEMS_PER_PAGE = 10;

export default function ViewAllSignUpRequest() {
  const [currentPage, setCurrentPage] = useState(0);
  const [openAddSignUpBonusRequestModal, setOpenAddSignUpBonusRequestModal] = useState(false);

  const { data, isPending, isError, error, refetch, isRefetching } = useGetAllSignupBonusRequest({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });
  const apiResponse = data?.data;

  // Extract pagination info
  const pagination = apiResponse?.pagination;
  const signUpBonusRequests: SignupBonusRequestData[] = apiResponse?.data || [];

  // Get pagination values from API response
  const totalRows = pagination?.totalElements || signUpBonusRequests.length;
  const totalPages = pagination?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE);

  const { startIndex, endIndex, handlePreviousPage, handleNextPage } = usePurchasesPagination(
    currentPage,
    totalRows,
    ITEMS_PER_PAGE,
    totalPages,
    setCurrentPage
  );

  if (isPending) {
    return <LoadingSpinner message="Loading sign up bonus requests..." />
  }

  if (isError) {
    return (
      <ErrorState
        title="Error Loading Sign Up Bonus Requests"
        message={error?.message || "Failed to load sign up bonus requests. Please try again."}
        onRetry={refetch}
        retryText="Retry"
      />
    );
  }

  const handleOpenAddRequestModal = () => {
    setOpenAddSignUpBonusRequestModal(true);
  }

  const handleCloseAddRequestModal = () => {
    setOpenAddSignUpBonusRequestModal(false);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center
      ">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sign Up Bonus Requests</h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage all sign up bonus requests
          </p>
        </div>
        <Button className="bg-theme-dark-green text-white"
          onClick={handleOpenAddRequestModal}>
          <Plus className="h-4 w-4" />
          Sign Up Bonus Request
        </Button>
      </div>

      <SignupBonusRequestDataSection
        data={signUpBonusRequests}
        columns={signupBonusRequestColumns}
      />

      {signUpBonusRequests?.length > 0 && (
        <SignupBonusRequestPagination
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalRows}
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onRefresh={refetch}
          isRefetching={isRefetching}
        />
      )}

      <SignUpRequestDialog
        isOpen={openAddSignUpBonusRequestModal}
        onClose={handleCloseAddRequestModal}
      />
    </div>
  );
}