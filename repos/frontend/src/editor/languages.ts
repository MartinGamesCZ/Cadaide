import { isMatch } from "matcher";

const languagePatterns = [
  {
    pattern: "*.ts",
    language: "typescript",
  },
  {
    pattern: "*.py",
    language: "python",
  },
];

export function getLanguage(name: string) {
  return (
    languagePatterns.find((p) => isMatch(name, p.pattern))?.language ??
    "plaintext"
  );
}
