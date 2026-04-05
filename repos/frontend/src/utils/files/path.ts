export function basename(p: string) {
  const normalizedPath = p.replace(/\\/g, "/");

  return normalizedPath.split("/").pop()!;
}

export function dirname(p: string) {
  const normalizedPath = p.replace(/\\/g, "/");

  return normalizedPath.split("/").slice(0, -1).join("/");
}
