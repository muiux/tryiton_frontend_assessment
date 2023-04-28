import { PhotoType } from "./photo";

export type MainSliceType = {
  photos: PhotoType[];
  getMsgById: (id: number) => string;
  getPhotoById: (id:number) => string;
  updateMsgById: (id: number, msg: string) => void;
  updatePhotoById: (id: number, dataUrl: string) => void;
}

export type ModalSliceType = {
  currentPhotoId: number;
  isMsgModalOpen: boolean;
  isEditModalOpen: boolean;
  setCurrentPhotoId: (id: number) => void;
  openMsgModal: (isOpen: boolean) => void;
  openEditModal: (isOpen: boolean) => void;
}