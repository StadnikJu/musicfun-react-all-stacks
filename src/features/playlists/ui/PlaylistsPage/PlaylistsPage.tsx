import { useFetchPlaylistsQuery } from "../../api/playlistsApi";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import { useState, type ChangeEvent } from "react";
import { useDebounceValue } from "@/common/hooks";
import { Pagination } from "@/common/components";
import { PlaylistsList } from "./PlaylistList/PlaylistList";
import s from "./PlaylistsPage.module.css";

export const PlaylistsPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const deboundsSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({ search: deboundsSearch, pageNumber: currentPage, pageSize });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="search" placeholder={"Search playlist by title"} onChange={(e) => searchPlaylistHandler(e)} />
      <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
