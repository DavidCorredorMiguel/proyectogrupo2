import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
    }),
    {
      name: "auth-storage", // nombre de la key en localStorage
    },
  ),
);
