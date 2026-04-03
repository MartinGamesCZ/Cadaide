import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class FrontendBuildBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("frontend.build");

    this.#rootPath = path.join(process.cwd(), "../frontend");
  }

  async run(): Promise<void> {
    await this.runBuildCommand().catch((error) => this.logger.error(error));
  }

  async runBuildCommand() {
    this.logger.info("Building frontend...");

    const command = Shell.run(["bun", "run", "build"], this.#rootPath);

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
