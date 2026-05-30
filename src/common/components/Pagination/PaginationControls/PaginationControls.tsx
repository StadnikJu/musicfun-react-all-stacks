import { getPaginationPages } from "@/common/utils";
import s from "./PaginationControls.module.css";

type Props = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  pagesCount: number;
};

export const PaginationControls = ({ setCurrentPage, currentPage, pagesCount }: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount);
  return (
    <div className={s.pagination}>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
            disabled={page === currentPage}
            type="button"
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
};
