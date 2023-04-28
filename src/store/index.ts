import create from "zustand";
import { createMainSlice } from "./mainSlice";
import { createModalSlice } from "./modalSlice";
import { MainSliceType, ModalSliceType } from "@/types/slice";

type StoreState = MainSliceType & ModalSliceType;

export const useAppStore = create<StoreState>()((...data) => ({
  ...createMainSlice(...data),
  ...createModalSlice(...data)
}));
