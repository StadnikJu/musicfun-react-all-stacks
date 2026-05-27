import { useForm } from "react-hook-form";
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from "../../api/playlistsApi";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import type { PlaylistData, UpdatePlaylistArgs } from "../../api/playlistsApi.types";
import { useState } from "react";
import { PlaylistItem } from "./PlaylistItem/PlaylistItem";
import { EditPlaylistForm } from "./EditPlaylistForm/EditPlaylistForm";
import s from "./PlaylistsPage.module.css";

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data } = useFetchPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();


  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        data: {
          type: "playlists",
          attributes: {
            title: playlist.attributes.title,
            description: playlist.attributes.description,
            tagIds: playlist.attributes.tags.map((tag) => tag.id),
          },
        },
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlist.id === playlistId;

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing 
                ? <EditPlaylistForm 
                    playlistId={playlistId} 
                    setPlaylistId={setPlaylistId}
                    editPlaylist={editPlaylistHandler}
                    handleSubmit={handleSubmit}
                    register={register}
                  /> 
                : 
                  <PlaylistItem
                    playlist={playlist}
                    deletePlaylistHandler={deletePlaylistHandler}
                    editPlaylistHandler={editPlaylistHandler}
                  />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
