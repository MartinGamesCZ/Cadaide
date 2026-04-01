import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWorkspaceState = create<{
  workspacePath: string | null;

  setWorkspacePath: (path: string) => void;
  unsetWorkspacePath: () => void;
}>()(
  persist(
    (set) => ({
      workspacePath: null,

      setWorkspacePath: (path) => set({ workspacePath: path }),
      unsetWorkspacePath: () => set({ workspacePath: null }),
    }),
    {
      name: "workspace-state",
    },
  ),
);
