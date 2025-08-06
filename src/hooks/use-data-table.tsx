import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/data-table-constant";
import { useState } from "react";

export default function useDataTable() {
  const [currentPage, setCurrrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrrentLimit] = useState(DEFAULT_LIMIT);

  const handleChangePage = (page: number) => {
    setCurrrentPage(page);
  };

  const handleChangeLimit = (limit: number) => {
    setCurrrentLimit(limit);
    setCurrrentPage(DEFAULT_PAGE);
  };

  return {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
  };
}
