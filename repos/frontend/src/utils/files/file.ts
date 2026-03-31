import path from "path";

export function pathToName(p: string) {
  return path.basename(p);
}
