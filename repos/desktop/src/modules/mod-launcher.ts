import { spawn, type ChildProcess } from "child_process";
import path from "path";

export enum ModLauncherProfile {
  Backend = "backend",
  Frontend = "frontend",
}

const configurations: {
  [key in ModLauncherProfile]: {
    command: string;
    args: string[];
    cwd: string;
  };
} = {
  [ModLauncherProfile.Backend]: {
    command: "bun",
    args: ["run", "start:dev"],
    cwd: "../backend",
  },
  [ModLauncherProfile.Frontend]: {
    command: "bun",
    args: ["run", "dev"],
    cwd: "../frontend",
  },
};

export class ModLauncher {
  #process: ChildProcess | null = null;

  constructor(profile: ModLauncherProfile) {
    const { command, args, cwd } = configurations[profile];

    this.#process = spawn(command, args, {
      cwd: path.join(process.cwd(), cwd),
      env: process.env,
      detached: true,
      stdio: "inherit",
    });

    this.#process.on("error", (error) => {
      console.error("Failed to start " + profile + ":", error);
    });

    this.#process.on("exit", (code) => {
      console.log(profile + " exited with code " + code);
    });
  }

  public kill() {
    if (this.#process?.pid) {
      try {
        process.kill(-this.#process.pid, "SIGTERM");
      } catch {
        this.#process.kill("SIGTERM");
      }
    }

    this.#process = null;
  }
}
