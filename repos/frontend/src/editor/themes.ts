import { Monaco } from "@monaco-editor/react";
import { themeCatpuccinMocha } from "./themes/catpuccin/mocha.theme";

const themes = {
  "catpuccin-mocha": themeCatpuccinMocha,
};

export function registerMonacoThemes(monaco: Monaco) {
  Object.entries(themes).forEach(([name, theme]) => {
    monaco.editor.defineTheme(name, theme);
  });
}
