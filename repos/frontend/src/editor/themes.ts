import { Monaco } from "@monaco-editor/react";
import { themeCatppuccinMocha } from "./themes/catppuccin/mocha.theme";

const themes = {
  "catppuccin-mocha": themeCatppuccinMocha,
};

export function registerMonacoThemes(monaco: Monaco) {
  Object.entries(themes).forEach(([name, theme]) => {
    monaco.editor.defineTheme(name, theme);
  });
}
