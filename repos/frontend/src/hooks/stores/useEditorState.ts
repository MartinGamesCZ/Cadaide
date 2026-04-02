import { editor } from "monaco-editor";
import { create } from "zustand";

export const useEditorState = create<{
  activeModel: string | null;

  setActiveModel: (uri: string) => void;
  unsetActiveModel: () => void;
}>()((set, get) => ({
  activeModel: null,

  setActiveModel: (uri: string) =>
    set({
      activeModel: uri,
    }),
  unsetActiveModel: () =>
    set({
      activeModel: null,
    }),
}));
