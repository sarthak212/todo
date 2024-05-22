import { create } from "zustand";

export const useUser = create((set) => ({
  userDetails: { authenticated: null, id: null, email: null, avatar: null },
  updateUserDetails: (updatedDetails: any) =>
    set((state: any) => ({
      userDetails: { ...state.userDetails, ...updatedDetails },
    })),
}));
