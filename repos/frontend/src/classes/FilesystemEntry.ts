import path from "path";

export abstract class FilesystemEntry {
  #path: string;

  constructor(path: string) {
    this.#path = path;
  }

  get name(): string {
    return path.basename(this.#path);
  }

  get path(): string {
    return this.#path;
  }
}
