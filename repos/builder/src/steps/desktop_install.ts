import path from "path";
import { BuildStep } from "../step";
import { Shell } from "../shell";

export class DesktopInstallBuildStep extends BuildStep {
  #rootPath: string;

  constructor() {
    super("desktop.install");

    this.#rootPath = path.join(process.cwd(), "../desktop");
  }

  async run(): Promise<void> {
    await this.#runPackageInstaller().catch((error) =>
      this.logger.error(error),
    );
  }

  async #runPackageInstaller() {
    this.logger.info("Installing desktop dependencies...");

    const command = Shell.run(
      ["bun", "install", "--frozen-lockfile"],
      this.#rootPath,
    );

    return new Promise<void>((resolve, reject) => {
      command.await().then(resolve).catch(reject);
    });
  }
}
