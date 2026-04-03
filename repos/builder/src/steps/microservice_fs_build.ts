import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class MicroserviceFsBuildBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("microservice.fs.build");

    this.#rootPath = path.join(process.cwd(), "../microservices/fs");
  }

  async run(): Promise<void> {
    await this.runBuildCommand().catch((error) => this.logger.error(error));
  }

  async runBuildCommand() {
    this.logger.info("Building fs microservice...");

    const command = Shell.run(
      ["go", "build", "-o", "build/fs", "./src/main.go"],
      this.#rootPath,
    );

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
