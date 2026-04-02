import { IconifyIcon } from "@iconify/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTabbarViewState = create<{
  tabs: {
    path: string;
    icon: string | IconifyIcon;
    name: string;
  }[];
  activeTabPath: string | null;

  addTab: (path: string, icon: string | IconifyIcon, name: string) => void;
  removeTab: (path: string) => void;
  setActiveTab: (path: string) => void;
}>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabPath: null,

      addTab: (path, icon, name) => {
        const { tabs } = get();

        if (tabs.some((tab) => tab.path === path)) {
          set({
            activeTabPath: path,
          });

          return;
        }

        set((state) => ({
          tabs: [...state.tabs, { path, icon, name }],
          activeTabPath: path,
        }));
      },
      removeTab: (path) =>
        set((state) => ({
          tabs: state.tabs.filter((tab) => tab.path !== path),
          activeTabPath:
            state.activeTabPath === path ? null : state.activeTabPath,
        })),
      setActiveTab: (id) =>
        set({
          activeTabPath: id,
        }),
    }),
    {
      name: "tabbar-view-state",
    },
  ),
);
