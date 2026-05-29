import { useDeletePlaylisCoverMutation, useUploadPlaylisCoverMutation } from "@/features/playlists/api/playlistsApi";
import defaultCover from "@/assets/images/default-playlist-cover.png";
import type { ChangeEvent } from "react";
import type { Images } from "@/common/types";
import { toast } from "react-toastify";
import s from "./PlaylistCover.module.css";

type Props = {
  playlistId: string;
  images: Images;
};

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const [uploadPlaylisCover] = useUploadPlaylisCoverMutation();
  const [deletePlaylisCover] = useDeletePlaylisCoverMutation();

  const originalCover = images.main.find((img) => img.type === "original");
  const src = originalCover ? originalCover.url : defaultCover;

  const uploadPlaylisCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const allowedType = ["image/jgeg", "image/png", "image/gif"];
    const maxSize = 1024 * 1024; // 1MB

    const file = event.target.files?.length && event.target.files[0];
    if (!file) return;

    if (!allowedType.includes(file.type)) {
      toast("Only JPEG, PNG or GIF images are allowed", { type: "error", theme: "colored" });
      return;
    }

    if (file.size > maxSize) {
      toast(
        `The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, 
        { type: "error", theme: "colored" }
      );
      return;
    }

    uploadPlaylisCover({ playlistId, file });
  };

  const deleteCoverHandler = () => deletePlaylisCover({ playlistId });

  return (
    <>
      <img src={src} alt="playlist cover" width={"100px"} className={s.cover} />
      <input type="file" accept={"image/jgeg, image/png, image/gif"} onChange={uploadPlaylisCoverHandler} />
      {originalCover && <button onClick={deleteCoverHandler}>X</button>}
    </>
  );
};
