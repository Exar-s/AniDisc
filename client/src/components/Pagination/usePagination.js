import { useMemo } from 'react';

//Get range of clickable pages 
const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

//Get page numbers
//if pages isssless than 11 return all numbers in range without ...
//if pages exceed 11 and currPage is center do first pg ... # # # ... last pg
//if pages exceed 11 and currPage on right do first pg ... # # # last pg
//if pages exceed 11 and currPage on left do first pg # # #  ... last pg
export const usePagination = ({ pages, currentPage, siblings = 1 }) => {
  return useMemo(() => {
    const items = 5;
    if (pages < 11) return range(1, pages);
    const leftSibling = Math.max(currentPage - siblings, 1);
    const rightSibling = Math.min(currentPage + siblings, pages);
    const showLeftDots = leftSibling > 4;
    const showRightDots = rightSibling < pages - 3;
    if (showLeftDots && showRightDots) {
      let midRange = range(leftSibling, rightSibling);
      return [1, '...', ...midRange, '...', pages];
    }
    if (!showLeftDots && showRightDots) {
      let leftRange = range(1, items);
      return [...leftRange, '...', pages];
    }
    if (showLeftDots && !showRightDots) {
        let rightRange = range((pages - items + 1), pages)
        return [1, '...', ...rightRange]
    }
  }, [pages, currentPage, siblings]);
};
