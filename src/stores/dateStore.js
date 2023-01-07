import create from "zustand";

export const useDateStore = create((set) => ({
  checkInDate: new Date(),
  checkOutDate: new Date(),
  changeInDate: (date) => set((state) => ({ checkInDate: date })),
  changeOutDate: (date) => set((state) => ({ checkOutDate: date })),
}));
