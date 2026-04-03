import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";
import { build, Platform } from "electron-builder";

export class AppBuildBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("app.build");

    this.#rootPath = path.join(process.cwd(), "../desktop");
  }

  async run(): Promise<void> {
    await this.runElectronBuilder().catch((error) => this.logger.error(error));
  }

  async runElectronBuilder() {
    this.logger.info("Building app...");

    return new Promise<void>((resolve, reject) => {
      build({
        targets: Platform.LINUX.createTarget("AppImage"),
        projectDir: this.#rootPath,
      })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
}
