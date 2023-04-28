import { PhotoType } from "@/types/photo";
import { MainSliceType } from "@/types/slice";
import { StateCreator } from "zustand";
import photos from "../data/photos.json";

export const createMainSlice: StateCreator<MainSliceType> = (
  set,
  get
) => ({
  photos: photos as PhotoType[],
  getPhotoById: (id: number) => {
    const index = id - 1;
    if(index < 0) return "";
    return get().photos[index].url;
  },
  getMsgById: (id: number) => {
    const index = id - 1;
    if(index < 0) return "";
    return get().photos[index].msg;
  },
  updateMsgById: (id: number, msg: string) => {
    const index = id - 1;
    const updatedPhotos = [...get().photos];
    updatedPhotos[index].msg = msg;
    set({ photos: updatedPhotos });
  },
  updatePhotoById: (id: number, dataUrl: string) => {
    const index = id - 1;
    const updatedPhotos = [...get().photos];
    updatedPhotos[index].url = dataUrl;
    set({ photos: updatedPhotos });
  },
});
