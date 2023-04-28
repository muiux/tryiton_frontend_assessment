import { ModalSliceType } from "@/types/slice";
import { StateCreator } from "zustand";

export const createModalSlice: StateCreator<ModalSliceType> = (
  set,
  get
) => ({
  currentPhotoId: -1,
  isMsgModalOpen: false,
  isEditModalOpen: false,
  setCurrentPhotoId: (id: number) => {
    set({currentPhotoId: id})
  },
  openMsgModal: (isOpen: boolean) => {
    set({isMsgModalOpen: isOpen})
  },
  openEditModal: (isOpen: boolean) => {
    set({isEditModalOpen: isOpen})
  }
});
