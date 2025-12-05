export interface UseDealsPaginationProps {
  currentPage: number;
  totalRows: number;
  itemsPerPage: number;
  totalPages: number;
}

interface UseDealsPaginationReturn {
  startIndex: number;
  endIndex: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export function useDealsPagination(
  currentPage: number,
  totalRows: number,
  itemsPerPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void
): UseDealsPaginationReturn {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRows);

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  };

  return {
    startIndex,
    endIndex,
    handlePreviousPage,
    handleNextPage,
  };
}

