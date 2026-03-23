import { create } from "zustand";

type UIState = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  isDialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
  isDialogOpen: false,
  setDialogOpen: (value) => set({ isDialogOpen: value }),
}));
