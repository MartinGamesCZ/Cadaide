import { registerMonacoThemes } from "@/editor/themes";
import { Monaco, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useProjectStore } from "./stores/useProjectStore";

export function useCodeEditorSetup() {
  const loadedFiles = useProjectStore((state) => state.loadedFiles);
  const activeFile = useProjectStore((state) => state.activeFile);

  const monaco = useMonaco();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const fullActiveFile = useMemo(
    () => loadedFiles.find((f) => f.path == activeFile),
    [loadedFiles, activeFile],
  );

  useEffect(() => {
    if (!monaco) return;
    if (!activeFile) return;

    if (!fullActiveFile) return;

    const uri = monaco.Uri.parse(`file://${fullActiveFile.path}`);
    let model = monaco.editor.getModel(uri);

    console.log(fullActiveFile);

    if (!model) {
      model = monaco.editor.createModel(
        fullActiveFile.content,
        fullActiveFile.language,
        uri,
      );
    }

    if (editorRef.current) editorRef.current.setModel(model);
  }, [monaco, loadedFiles, activeFile]);

  const beforeMountHandler = useCallback((monaco: Monaco) => {
    registerMonacoThemes(monaco);
  }, []);

  const onMountHandler = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  }, []);

  return {
    beforeMount: beforeMountHandler,
    onMount: onMountHandler,
  };
}
