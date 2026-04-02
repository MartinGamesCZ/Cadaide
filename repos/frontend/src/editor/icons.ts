import { IconifyIcon } from "@iconify/react";
import catppuccinIconConfig from "@/config/icons/catppuccin.json";
import { isMatch } from "matcher";

export type TIconpack = {
  pattern: string | string[];
  icon: IconifyIcon | string;
}[];

export const Iconpacks: Record<string, TIconpack> = {
  catppuccin: catppuccinIconConfig.files,
  catppuccinFolders: catppuccinIconConfig.folders,
};

export function getIcon(name: string, isFolder: boolean = false) {
  return (
    Iconpacks[isFolder ? "catppuccinFolders" : "catppuccin"].find((icon) =>
      isMatch(name, icon.pattern),
    )?.icon ?? (isFolder ? "catppuccin:folder" : "catppuccin:file")
  );
}
