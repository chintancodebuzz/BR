import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:border-[#501F08] hover:bg-[#501F08]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-5 h-5 text-[#501F08]" />
            </button>

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === page
                                ? 'bg-[#501F08] text-white shadow-lg shadow-[#501F08]/25'
                                : 'border border-gray-200 text-gray-700 hover:border-[#501F08] hover:bg-[#501F08]/5'
                            }`}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:border-[#501F08] hover:bg-[#501F08]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-5 h-5 text-[#501F08]" />
            </button>
        </div>
    );
}
