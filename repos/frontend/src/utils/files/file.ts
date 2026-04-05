import { basename } from "./path";

export function pathToName(p: string) {
  return basename(p);
}
