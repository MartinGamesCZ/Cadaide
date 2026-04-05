import path from "path";
import { Filesystem } from "./Filesystem";
import { basename } from "@/utils/files/path";

export class Workspace {
  #path: string;

  #filesystem: Filesystem;

  constructor(path: string) {
    this.#path = path;

    this.#filesystem = new Filesystem(path);
  }

  get name(): string {
    return basename(this.#path);
  }

  get path(): string {
    return this.#path;
  }

  get filesystem(): Filesystem {
    return this.#filesystem;
  }
}
