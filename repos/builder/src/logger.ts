import chalk from "chalk";

export class Logger {
  #prefix: string;

  constructor(prefix: string) {
    this.#prefix = prefix;
  }

  stepStarting(name: string) {
    console.log(
      `${chalk.gray(`(${this.#prefix})`)} ${chalk.blue("→")} ${chalk.gray("Starting")} ${chalk.blue(name)}${chalk.gray("...")}`,
    );
  }

  stepDone(name: string) {
    console.log(
      `${chalk.gray(`(${this.#prefix})`)} ${chalk.green("✓")} ${chalk.gray("Done")} ${chalk.blue(name)}`,
    );
  }

  error(message: Error) {
    console.log(
      `${chalk.gray(`(${this.#prefix})`)} ${chalk.red("✗")} ${chalk.gray("Error")} ${chalk.blue(message.message)}`,
    );
  }

  info(message: string) {
    console.log(
      `${chalk.gray(`(${this.#prefix})`)} ${chalk.blue("ℹ")} ${chalk.gray("Info")} ${chalk.blue(message)}`,
    );
  }
}
