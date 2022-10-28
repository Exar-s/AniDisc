import { usePagination } from './usePagination';
import './paginate.css';
import PropTypes from 'prop-types';

const Pagination = ({ handlePageChange, pages, currentPage }) => {
  const paginationRange = usePagination({
    pages,
    currentPage,
  });

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handleGoToPage = (e) => {
    handlePageChange(parseInt(e.target.dataset.page));
  };

  return (
    <div className='paginate'>
      {currentPage !== 1 && <div onClick={handlePrevPage}>&lt;</div>}
      {paginationRange.map((page, index) => {
        return page === currentPage ? (
          <div className='currPage' key={index}>
            {page}
          </div>
        ) : page === '...' ? (
          <div className='paginate-dots' key={index}>
            {page}
          </div>
        ) : (
          <div onClick={handleGoToPage} data-page={page} key={index}>
            {page}
          </div>
        );
      })}
      {currentPage !== pages && <div onClick={handleNextPage}>&gt;</div>}
    </div>
  );
};

Pagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
