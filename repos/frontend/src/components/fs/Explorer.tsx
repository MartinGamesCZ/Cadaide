import { useWorkspaceState } from "@/hooks/stores/useWorkspaceState";
import { Expandable } from "../utils/Expandable";
import { FilesystemFolderEntry } from "@/classes/FilesystemFolderEntry";
import { useAwait } from "@/hooks/useAwait";
import { FilesystemFileEntry } from "@/classes/FilesystemFileEntry";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface IExplorerFolderProps {
  folderEntry: FilesystemFolderEntry;
  isRoot?: boolean;
}

interface IExplorerFileProps {
  fileEntry: FilesystemFileEntry;
}

export function ExplorerFolder(props: IExplorerFolderProps) {
  const [isExpanded, setIsExpanded] = useState(props.isRoot ?? false);

  const entries = useAwait(
    () => props.folderEntry.ls(),
    [props.folderEntry, isExpanded],
    () => isExpanded,
  );

  return (
    <Expandable
      title={props.folderEntry.name}
      expandedIcon={
        props.isRoot ? "catppuccin:root-open" : props.folderEntry.icon
      }
      collapsedIcon={props.isRoot ? "catppuccin:root" : props.folderEntry.icon}
      defaultExpanded={props.isRoot}
      isLoading={entries.isLoading}
      onStateChange={(isExpanded) => setIsExpanded(isExpanded)}
    >
      {isExpanded &&
        entries.data?.map((entry) =>
          entry instanceof FilesystemFolderEntry ? (
            <ExplorerFolder key={entry.path} folderEntry={entry} />
          ) : (
            <ExplorerFile key={entry.path} fileEntry={entry} />
          ),
        )}
    </Expandable>
  );
}

export function ExplorerFile(props: IExplorerFileProps) {
  return (
    <button
      onClick={() => {}}
      className="w-full flex flex-row items-center gap-1.5 px-1.5 py-1 hover:bg-ctp-surface0 cursor-pointer transition-colors text-ctp-text"
    >
      <div className="w-4 h-4" />
      <div className="w-5 h-5">
        <Icon
          icon={props.fileEntry.icon}
          width={20}
          height={20}
          className="shrink-0 text-ctp-lavender"
        />
      </div>
      <span className="text-ctp-text text-[15px] whitespace-nowrap">
        {props.fileEntry.name}
      </span>
    </button>
  );
}
