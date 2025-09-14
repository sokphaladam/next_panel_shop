import React, { useEffect, useState } from "react";

export function usePagination() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState<25 | 50 | 75 | 100>(25);

  const handleResetPage = () => {
    setLimit(25);
    setOffset(0);
  };

  useEffect(() => {
    const handleRouteChange = (event: any) => {
      console.log("URL changed to:", event.href);
      setOffset(0);
      setLimit(25);
    };

    process.browser && window.addEventListener("popstate", handleRouteChange);

    return () => {
      process.browser &&
        window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return {
    offset,
    setOffset,
    limit,
    setLimit,
    handleResetPage,
  };
}

// Enhanced pagination hook for modern client-side pagination
export function useClientPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleResetPage = () => {
    setCurrentPage(1);
    setItemsPerPage(25);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Calculate pagination values
  const getPaginationInfo = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return {
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  };

  // Get paginated data
  const getPaginatedData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPage(1);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handleRouteChange);
      return () => window.removeEventListener("popstate", handleRouteChange);
    }
  }, []);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    handleItemsPerPageChange,
    handleResetPage,
    getPaginationInfo,
    getPaginatedData,
  };
}
