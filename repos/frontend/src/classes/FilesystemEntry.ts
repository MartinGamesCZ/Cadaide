import path from "path";

export abstract class FilesystemEntry {
  #path: string;

  constructor(path: string) {
    this.#path = path;
  }

  get name(): string {
    const normalizedPath = this.#path.replace(/\\/g, "/");

    return normalizedPath.split("/").pop()!;
  }

  get path(): string {
    return this.#path;
  }
}
