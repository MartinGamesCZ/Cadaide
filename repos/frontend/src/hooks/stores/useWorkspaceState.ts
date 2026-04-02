import { Workspace } from "@/classes/Workspace";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useWorkspaceState = create<{
  workspace: Workspace | null;

  setWorkspace: (workspace: Workspace) => void;
  unsetWorkspace: () => void;
}>()(
  persist(
    (set) => ({
      workspace: null,

      setWorkspace: (workspace) => set({ workspace }),
      unsetWorkspace: () => set({ workspace: null }),
    }),
    {
      name: "workspace-state",
      // Create a custom storage with reviver to restore the Workspace class instance
      // from the stored data
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (
            key === "workspace" &&
            value !== null &&
            value !== undefined &&
            typeof value === "object" &&
            "path" in value &&
            typeof (value as { path: unknown }).path === "string"
          ) {
            return new Workspace((value as { path: string }).path);
          }

          return value;
        },
      }),
      // Only store the path of the workspace, not the entire object
      partialize: (state) => ({
        workspace: state.workspace ? { path: state.workspace.path } : null,
      }),
    },
  ),
);
