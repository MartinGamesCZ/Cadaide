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

  openProject: (path: string) => void;
  loadFile: (path: string, content: string) => void;
  setActiveFile: (path: string) => void;
}>()(
  persist(
    (set, get) => ({
      path: null,
      loadedFiles: [],
      activeFile: null,

      openProject: (path: string) => set({ path }),
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
      setActiveFile: async (path) => {
        const content = await API.fs.readFile(path);

        get().loadFile(path, content);

        set({ activeFile: path });
      },
    }),
    {
      name: "project",
    },
  ),
);
