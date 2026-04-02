import { FilesystemFileEntry } from "@/classes/FilesystemFileEntry";
import { FilesystemFolderEntry } from "@/classes/FilesystemFolderEntry";

export function sortFilesystemEntries(
  a: FilesystemFolderEntry | FilesystemFileEntry,
  b: FilesystemFolderEntry | FilesystemFileEntry,
) {
  if (a instanceof FilesystemFolderEntry && b instanceof FilesystemFileEntry)
    return -1;
  if (a instanceof FilesystemFileEntry && b instanceof FilesystemFolderEntry)
    return 1;

  return a.name.localeCompare(b.name);
}
