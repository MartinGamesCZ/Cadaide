import { useWorkspaceState } from "@/hooks/stores/useWorkspaceState";
import { Expandable } from "../utils/Expandable";
import { Workspace } from "@/classes/Workspace";

export function ExplorerView() {
  const workspacePath = useWorkspaceState((state) => state.workspacePath);

  if (!workspacePath) return null; // TODO

  return (
    <div className="w-full h-full bg-ctp-mantle overflow-auto">
      <div className="min-w-fit flex flex-col">
        <Expandable
          title={Workspace.pathToName(workspacePath)}
          defaultExpanded={true}
          expandedIcon="catppuccin:root-open"
          collapsedIcon="catppuccin:root"
        >
          <ExplorerViewFolder />
        </Expandable>
      </div>
    </div>
  );
}

function ExplorerViewFolder() {
  return (
    <Expandable
      title="TODO"
      defaultExpanded={false}
      expandedIcon="catppuccin:folder-open"
      collapsedIcon="catppuccin:folder"
    >
      {new Array(10).fill(0).map((_, i) => (
        <ExplorerViewFolder key={i} />
      ))}
    </Expandable>
  );
}
