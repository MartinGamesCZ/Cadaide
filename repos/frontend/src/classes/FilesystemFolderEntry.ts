import path from "path";
import { FilesystemFileEntry } from "./FilesystemFileEntry";
import { API } from "@/api";
import { sortFilesystemEntries } from "@/utils/files/sort";
import { FilesystemEntry } from "./FilesystemEntry";
import { IconifyIcon } from "@iconify/react";
import { getIcon } from "@/editor/icons";

export class FilesystemFolderEntry extends FilesystemEntry {
  constructor(path: string) {
    super(path);
  }

  get icon(): IconifyIcon | string {
    return getIcon(this.name, true);
  }

  async ls(): Promise<Array<FilesystemFolderEntry | FilesystemFileEntry>> {
    const entries = await API.fs.listDir(this.path);

    return entries
      .map((entry) => {
        if (entry.type == "directory")
          return new FilesystemFolderEntry(entry.path);
        return new FilesystemFileEntry(entry.path);
      })
      .sort(sortFilesystemEntries);
  }
}
