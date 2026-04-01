import path from "path";

export class Workspace {
  static pathToName(workspacePath: string): string {
    return path.basename(workspacePath);
  }
}
