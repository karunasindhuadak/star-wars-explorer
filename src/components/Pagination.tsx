"use client";

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];

  pages.push(1);

  const windowStart = Math.max(2, currentPage - 2);
  const windowEnd = Math.min(totalPages - 1, currentPage + 2);

  if (windowStart > 2) {
    pages.push("...");
  }

  for (let i = windowStart; i <= windowEnd; i++) {
    pages.push(i);
  }

  if (windowEnd < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onNext,
  onPrev,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate "Showing X–Y of Z"
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/*Showing X–Y of Z characters*/}
      <p className="text-sm text-sw-text-muted">
        Showing{" "}
        <span className="font-medium text-sw-tex">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-medium text-sw-tex">{totalItems}</span> characters
      </p>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        {/*Previous Button*/}
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm rounded-lg border border-sw-border
                     bg-sw-surface text-sw-text
                     hover:bg-sw-border hover:text-sw-text
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors"
        >
          ← Prev
        </button>

        {/*For Mobile Screen*/}
        <span className="flex sm:hidden px-3 py-2 text-sm text-sw-text-muted">
          Page {currentPage} of {totalPages}
        </span>

        {/*For Desktop Screen*/}
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-sm text-sw-text-muted"
                >
                  ...
                </span>
              )
            }

            const isActive = page === currentPage
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-amber-500/90 text-sw-bg font-bold"
                    : "bg-sw-surface text-sw-text-muted border border-sw-border hover:bg-sw-border hover:text-sw-text"
                }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        {/*Next Button*/}
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm rounded-lg border border-sw-border
                     bg-sw-surface text-sw-text
                     hover:bg-sw-border hover:text-sw-text
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
