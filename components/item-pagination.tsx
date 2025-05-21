import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ItemPagination({
  baseUrl,
  page,
  // pageSize,
  pagesCount,
}: {
  baseUrl: string;
  page: number;
  // pageSize: number;
  pagesCount: number;
}) {
  // Calculate the range of pages to display (show 5 pages at a time)
  const getPageRange = () => {
    // Always show 5 pages if available
    const rangeSize = 5;

    // Start by centering current page if possible
    let start = Math.max(1, page - Math.floor(rangeSize / 2));
    const end = Math.min(pagesCount, start + rangeSize - 1);

    // Adjust start if we're near the end
    if (end === pagesCount) {
      start = Math.max(1, end - rangeSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();

  // Only show start ellipsis if there's a gap (pageRange[0] > 2)
  const showStartEllipsis = pageRange[0] > 2;
  const showStartPage = pageRange[0] > 1;

  // Only show end ellipsis if there's a gap (last page in range < pagesCount - 1)
  const showEndEllipsis = pageRange[pageRange.length - 1] < pagesCount - 1;
  const showEndPage = pageRange[pageRange.length - 1] < pagesCount;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${baseUrl}?page=${Math.max(page - 1, 1)}`}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {/* First page link if needed */}
        {showStartPage && (
          <PaginationItem>
            <PaginationLink href={`${baseUrl}?page=1`}>1</PaginationLink>
          </PaginationItem>
        )}

        {/* Start ellipsis if needed */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page range */}
        {pageRange.map((pageNum) =>
          // Don't duplicate the first or last page if they're already shown
          (pageNum !== 1 && pageNum !== pagesCount) ||
          (pageNum === 1 && !showStartPage) ||
          (pageNum === pagesCount && !showEndPage) ? (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                href={`${baseUrl}?page=${pageNum}`}
                isActive={pageNum === page}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ) : null,
        )}

        {/* End ellipsis if needed */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page link if needed */}
        {showEndPage && (
          <PaginationItem>
            <PaginationLink href={`${baseUrl}?page=${pagesCount}`}>
              {pagesCount}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}?page=${Math.min(page + 1, pagesCount)}`}
            aria-disabled={page === pagesCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
