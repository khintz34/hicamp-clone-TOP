import create from "zustand";

export const usePetStore = create((set) => ({
  petSearch: "",
  changePetSearch: (info) => set((state) => ({ petSearch: info })),
}));
