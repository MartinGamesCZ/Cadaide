import { FilesystemFolderEntry } from "./FilesystemFolderEntry";

export class Filesystem {
  #root: FilesystemFolderEntry;

  constructor(root: string) {
    this.#root = new FilesystemFolderEntry(root);
  }

  get root(): FilesystemFolderEntry {
    return this.#root;
  }
}
