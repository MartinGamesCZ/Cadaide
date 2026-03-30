import { registerMonacoThemes } from "@/editor/themes";
import { Monaco } from "@monaco-editor/react";
import { useCallback } from "react";

export function useCodeEditorSetup() {
  const beforeMountHandler = useCallback((monaco: Monaco) => {
    registerMonacoThemes(monaco);
  }, []);

  return {
    beforeMount: beforeMountHandler,
  };
}
