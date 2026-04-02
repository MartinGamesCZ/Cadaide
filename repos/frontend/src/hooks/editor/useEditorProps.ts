import { useCallback } from "react";
import { IEditorThemeOutput } from "./useEditorTheme";
import { Monaco } from "@monaco-editor/react";
import { IEditorModelsOutput } from "./useEditorModels";
import { editor } from "monaco-editor";
import { IEditorSingletonOutput } from "./useEditorSingleton";

export function useEditorProps(props: {
  theme: IEditorThemeOutput;
  models: IEditorModelsOutput;
  singleton: IEditorSingletonOutput;
}) {
  const onBeforeMount = useCallback(
    async (monaco: Monaco) => {
      props.theme.onBeforeMount(monaco);
      await props.models.onBeforeMount(monaco);
    },
    [props.theme, props.models],
  );

  const onMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      props.models.onMount(editor, monaco);
      props.singleton.onMount(editor, monaco);
    },
    [props.models, props.singleton],
  );

  return {
    theme: props.theme.theme,
    options: {
      ...props.theme.options,
    },

    beforeMount: onBeforeMount,
    onMount: onMount,
  };
}
