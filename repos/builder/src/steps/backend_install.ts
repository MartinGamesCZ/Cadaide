import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class BackendInstallBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("backend.install");

    this.#rootPath = path.join(process.cwd(), "../backend");
  }

  async run(): Promise<void> {
    await this.#runPackageInstaller().catch((error) =>
      this.logger.error(error),
    );
  }

  async #runPackageInstaller() {
    this.logger.info("Installing backend dependencies...");

    const command = Shell.run(
      ["bun", "install", "--frozen-lockfile"],
      this.#rootPath,
    );

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
