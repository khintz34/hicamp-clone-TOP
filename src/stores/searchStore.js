import create from "zustand";

export const useSearchStore = create((set) => ({
  search: "",
  changeSearch: (info) => set((state) => ({ search: info })),
}));
