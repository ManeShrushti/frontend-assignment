// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    const handlePrev = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleFirst = () => {
        if (currentPage > 1) onPageChange(1);
    };

    const handleLast = () => {
        if (currentPage < totalPages && currentPage >= 1) onPageChange(totalPages);
    };
  
    const getPageNumbers = () => {
        if (!totalPages) return [];
        const pageNumbers = [];
        const range = 2; 
        
        let startPage = Math.max(currentPage - range, 1);
        let endPage = Math.min(currentPage + range, totalPages);
    
        if (currentPage + range >= totalPages) {
            startPage = Math.max(totalPages - range * 2 - 1, 1);
        }
        if (currentPage <= range) {
          endPage = Math.min(range * 2 + 1, totalPages);
        }
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
    
        return pageNumbers;
    };

    return (
      <div className="pagination">
            <div className='page-details'>
                <span>Page {currentPage} of {totalPages}</span>
            </div>
            <div className='page-nav'>
                <button className='btn-link' onClick={handleFirst} disabled={currentPage == 1}  aria-label="First Page" aria-disabled={currentPage === 1}>
                    &lt;&lt; First
                </button>
                <button className="btn" onClick={handlePrev} disabled={currentPage === 1} aria-label="Previous Page" aria-disabled={currentPage === 1}>
                    Previous
                </button>
                
                {getPageNumbers().map(page => (
                    <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    aria-label={`Page ${page}`}
                    className={`page-number ${page === currentPage ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}

                <button className="btn" onClick={handleNext} disabled={currentPage === totalPages || totalPages <= 1} aria-label="Next Page" aria-disabled={currentPage === totalPages || totalPages <= 1}>
                    Next
                </button>
                <button className='btn-link' onClick={handleLast} disabled={currentPage === totalPages || totalPages <= 1}  aria-label="Last Page" aria-disabled={currentPage === totalPages || totalPages <= 1}>
                    Last &gt;&gt;
                </button>
             </div>
       </div>
       
    );
};
  
export default Pagination;
