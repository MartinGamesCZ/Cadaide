import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebarViewState = create<{
  activeViewId: string;
  activatedViewIds: string[];

  setActiveViewId: (id: string) => void;
  activateViewId: (id: string) => void;
  deactivateViewId: (id: string) => void;
}>()(
  persist(
    (set) => ({
      activeViewId: "explorer",
      activatedViewIds: [],

      setActiveViewId: (id: string) => set({ activeViewId: id }),
      activateViewId: (id: string) =>
        set((state) => ({
          activatedViewIds: [...state.activatedViewIds, id],
        })),
      deactivateViewId: (id: string) =>
        set((state) => ({
          activatedViewIds: state.activatedViewIds.filter(
            (viewId) => viewId !== id,
          ),
        })),
    }),
    {
      name: "sidebar-view-state",
    },
  ),
);
