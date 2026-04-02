import type { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useCallback, useEffect } from "react";
import { Editor } from "@/classes/Editor";
import { FilesystemFileEntry } from "@/classes/FilesystemFileEntry";
import type { Workspace } from "@/classes/Workspace";
import { getLanguage } from "@/editor/languages";
import { useEditorState } from "../stores/useEditorState";

interface IEditorModelsProps {
  workspace: Workspace;
}

export interface IEditorModelsOutput {
  onBeforeMount: (monaco: Monaco) => Promise<void>;
  onMount: (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void;
}

export function useEditorModels(
  props: IEditorModelsProps,
): IEditorModelsOutput {
  const onBeforeMount = useCallback(
    async (monaco: Monaco) => {
      const entries = await props.workspace.filesystem.root.tree();

      await Promise.all(
        entries.map(async (entry) => {
          if (!(entry instanceof FilesystemFileEntry)) return;

          const content = await entry.read();
          const model = monaco.editor.createModel(
            content,
            getLanguage(entry.name),
            monaco.Uri.parse(`file://${entry.path}`),
          );

          Editor.instance.addModel(model);
        }),
      );

      Editor.instance.markModelsLoaded();
    },
    [props.workspace],
  );

  const onMount = useCallback(
    async (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {},
    [],
  );

  return { onMount, onBeforeMount };
}
