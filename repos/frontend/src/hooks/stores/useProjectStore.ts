import { API } from "@/api";
import { getLanguage } from "@/editor/languages";
import { pathToName } from "@/utils/files/file";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProjectStore = create<{
  path: string | null;
  loadedFiles: {
    name: string;
    path: string;
    language: string;
    content: string;
  }[];
  activeFile: string | null;

  openProject: (path: string) => Promise<void>;
  loadFile: (path: string, content: string) => void;
  loadAllFiles: (path: string) => Promise<void>;
  setActiveFile: (path: string) => void;
}>()(
  persist(
    (set, get) => ({
      path: null,
      loadedFiles: [],
      activeFile: null,

      openProject: async (path: string) => {
        set({ path, loadedFiles: [] });

        await get().loadAllFiles(path);
      },
      loadFile: (path: string, content: string) =>
        set({
          loadedFiles: [
            ...get().loadedFiles,
            {
              path,
              content,
              name: pathToName(path),
              language: getLanguage(pathToName(path)),
            },
          ],
        }),
      loadAllFiles: async (path: string) => {
        const tree = await API.fs.treeDir(path, 10);

        await Promise.all(
          tree.map(async (file) => {
            if (file.type !== "file") return;

            const content = await API.fs.readFile(file.path);

            get().loadFile(file.path, content);
          }),
        );
      },
      setActiveFile: async (path) => {
        const content = await API.fs.readFile(path);

        get().loadFile(path, content);

        set({ activeFile: path });

        window.api.setActivity(pathToName(path));
      },
    }),
    {
      name: "project",
      partialize: (state) => ({
        path: state.path,
        activeFile: state.activeFile,
      }),
    },
  ),
);
