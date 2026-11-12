
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg border px-4 py-2 ${
              currentPage === page
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-gray-300 hover:bg-purple-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;