import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class FrontendCleanBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("frontend.clean");

    this.#rootPath = path.join(process.cwd(), "../frontend");
  }

  async run(): Promise<void> {
    await this.removeBuildDir().catch((error) => this.logger.error(error));
  }

  async removeBuildDir() {
    this.logger.info("Removing build directory...");

    const command = Shell.run(["rm", "-rf", ".next"], this.#rootPath);

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }

  async removeNodeModules() {
    this.logger.info("Removing node_modules directory...");

    const command = Shell.run(["rm", "-rf", "node_modules"], this.#rootPath);

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
