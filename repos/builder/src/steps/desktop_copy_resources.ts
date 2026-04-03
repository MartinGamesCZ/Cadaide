import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";
import { cp, exists, mkdir, rm } from "fs/promises";

const ItemsToCopy = {
  "desktop/package.json": "desktop/package.json",
  "desktop/node_modules": "desktop/node_modules",
  "desktop/dist": "desktop/dist",
  "frontend/package.json": "frontend/package.json",
  "frontend/node_modules": "frontend/node_modules",
  "frontend/.next": "frontend/.next",
  "frontend/public": "frontend/public",
  "backend/dist": "backend/dist",
  "backend/package.json": "backend/package.json",
  "backend/node_modules": "backend/node_modules",
  "microservices/fs/build/fs": "binaries/microservices/fs",
};

export class DesktopCopyResourcesBuildStep extends BuildStep {
  #rootPath: string;
  #resourceDir: string;

  constructor() {
    super("desktop.copy_resources");

    this.#rootPath = path.join(process.cwd(), "../");
    this.#resourceDir = path.join(this.#rootPath, "desktop/resources");
  }

  async run(): Promise<void> {
    await this.#removeOldResources().catch((error) => this.logger.error(error));
    await this.#createDir(this.#resourceDir).catch((error) =>
      this.logger.error(error),
    );
    await this.#copyItems().catch((error) => this.logger.error(error));
  }

  async #removeOldResources() {
    const dirExists = await exists(this.#resourceDir);
    if (!dirExists) return;

    this.logger.info("removing old resources");

    await rm(this.#resourceDir, { recursive: true, force: true });
  }

  async #createDir(path: string) {
    const dirExists = await exists(path);
    if (dirExists) return;

    this.logger.info("creating directory");

    await mkdir(path, { recursive: true });
  }

  async #copyItems() {
    for (const [source, destination] of Object.entries(ItemsToCopy)) {
      await this.#copyItem(source, destination);
    }
  }

  async #copyItem(source: string, destination: string) {
    const sourceExists = await exists(path.join(this.#rootPath, source));
    if (!sourceExists) return;

    this.logger.info(`copying ${source} to ${destination}`);

    await cp(
      path.join(this.#rootPath, source),
      path.join(this.#resourceDir, destination),
      { recursive: true },
    );
  }
}
