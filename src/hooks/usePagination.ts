"use Client"

import { useCallback, useEffect, useMemo, useState } from "react"

export function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / pageSize)
  }, [items.length, pageSize])

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize)
  }, [items, currentPage, pageSize])

  const goToPage = useCallback((page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(safePage)
  }, [totalPages])

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage
  }
}
