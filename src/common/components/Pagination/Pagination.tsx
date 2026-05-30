import { PageSizeSelector } from "./PageSizeSelector/PageSizeSelector";
import { PaginationControls } from "./PaginationControls/PaginationControls";
import s from "./Pagination.module.css";

type Props = {
  currentPage: number;
  pagesCount: number;
  pageSize: number;
  changePageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
};

export const Pagination = ({ currentPage, pagesCount, pageSize, changePageSize, setCurrentPage }: Props) => {
  if (pagesCount <= 1) return null;

  return (
    <div className={s.container}>
      <PaginationControls setCurrentPage={setCurrentPage} currentPage={currentPage} pagesCount={pagesCount} />
      <PageSizeSelector pageSize={pageSize} changePageSize={changePageSize} />
    </div>
  );
};
