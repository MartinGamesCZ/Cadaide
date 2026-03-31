import { useProjectStore } from "@/hooks/stores/useProjectStore";
import { useCodeEditorSetup } from "@/hooks/useCodeEditorSetup";
import { Editor } from "@monaco-editor/react";

export function CodeEditor() {
  const setupProps = useCodeEditorSetup();
  const path = useProjectStore((state) => state.path);

  if (!path) return <div></div>;

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-10 bg-ctp-mantle text-ctp-text text-[15px] border-b border-ctp-surface0 flex flex-row items-center gap-1.5 px-3.5">
        <p>{path.split("/").at(-1)}</p>
      </div>
      <Editor
        {...setupProps}
        theme="catpuccin-mocha"
        language="typescript"
        height="100%"
        options={{
          fontSize: 18,
          fontWeight: "700",
          fontFamily: "var(--font-jetBrains), 'JetBrains Mono', monospace",
          fontLigatures: true,
          minimap: {
            scale: 1.5,
          },
        }}
      />
    </div>
  );
}
