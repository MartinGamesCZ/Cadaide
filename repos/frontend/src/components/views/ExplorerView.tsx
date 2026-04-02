import { useWorkspaceState } from "@/hooks/stores/useWorkspaceState";
import { ExplorerFolder } from "../fs/Explorer";

export function ExplorerView() {
  const workspace = useWorkspaceState((state) => state.workspace);

  if (!workspace) return null; // TODO

  return (
    <div className="w-full h-full bg-ctp-mantle overflow-auto">
      <div className="min-w-fit flex flex-col">
        <ExplorerFolder folderEntry={workspace.filesystem.root} isRoot />
      </div>
    </div>
  );
}
