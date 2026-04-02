import { FilesystemEntry } from "./FilesystemEntry";
import { getIcon } from "@/editor/icons";
import { IconifyIcon } from "@iconify/react";

export class FilesystemFileEntry extends FilesystemEntry {
  constructor(path: string) {
    super(path);
  }

  get icon(): IconifyIcon | string {
    return getIcon(this.name);
  }
}
