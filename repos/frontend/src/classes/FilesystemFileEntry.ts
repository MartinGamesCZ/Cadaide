import { API } from "@/api";
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

  async read(): Promise<string> {
    const response = await API.fs.readFile(this.path);

    return response;
  }
}
