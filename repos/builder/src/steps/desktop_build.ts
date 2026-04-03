import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class DesktopBuildBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("desktop.build");

    this.#rootPath = path.join(process.cwd(), "../desktop");
  }

  async run(): Promise<void> {
    await this.runBuildCommand().catch((error) => this.logger.error(error));
  }

  async runBuildCommand() {
    this.logger.info("Building desktop...");

    const command = Shell.run(
      [
        "bun",
        "build",
        "src/index.ts",
        "src/preload.ts",
        "--outdir=dist",
        "--target=node",
        "--format=cjs",
        "--packages=external",
      ],
      this.#rootPath,
    );

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
