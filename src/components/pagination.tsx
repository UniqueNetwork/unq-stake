import React, { useState, useMemo, useEffect } from 'react';

export function usePagination<T>(data: T[], initialPageSize: number = 10) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(data.length / pageSize);

    const currentPageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    return {
        page,
        setPage,
        pageSize,
        setPageSize,
        totalPages,
        currentPageData,
    };
}

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
};

export const Pagination: React.FC<PaginationProps> = (pros) => {
    const {
        currentPage,
        totalPages,
        onPageChange,
        pageSize,
        onPageSizeChange,
    } = pros;

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    const renderPages = () => {
        const pages: (number | 'dots')[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 4) pages.push('dots');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 3) pages.push('dots');
            pages.push(totalPages);
        }

        return pages.map((page, idx) =>
                page === 'dots' ? (
                    <span key={`dots-${idx}`} className="st-px-2 st-text-gray-400">
          ...
        </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`st-px-3 st-py-1 st-text-sm st-rounded ${
                            page === currentPage
                                ? 'st-bg-blue-600 st-text-white'
                                : 'st-bg-gray-100 dark:st-bg-gray-700 st-text-gray-700 dark:st-text-gray-300 hover:st-bg-gray-200 dark:hover:st-bg-gray-600'
                        }`}
                    >
                        {page}
                    </button>
                )
        );
    };

    return (
        <div className="st-flex st-items-center st-justify-between st-mt-4 st-gap-4 st-flex-wrap">
            <div className="st-flex st-items-center st-gap-2">
                <span className="st-text-sm st-text-gray-600 dark:st-text-gray-300">Rows per page:</span>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="st-text-sm st-border st-rounded st-px-2 st-py-1 dark:st-bg-gray-800 dark:st-border-gray-700 dark:st-text-gray-200"
                >
                    {[10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="st-flex st-items-center st-gap-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="st-px-2 st-py-1 st-text-sm st-rounded st-text-blue-600 disabled:st-opacity-50"
                >
                    ← Prev
                </button>

                {renderPages()}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="st-px-2 st-py-1 st-text-sm st-rounded st-text-blue-600 disabled:st-opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};
