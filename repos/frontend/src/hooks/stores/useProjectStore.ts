import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProjectStore = create<{
  path: string | null;
  open: (path: string) => void;
}>()(
  persist(
    (set) => ({
      path: null,
      open: (path: string) => set({ path }),
    }),
    {
      name: "project",
    },
  ),
);
