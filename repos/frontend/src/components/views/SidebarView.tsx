import { useSidebarViewState } from "@/hooks/stores/useSidebarViewState";
import { IconType } from "react-icons";
import {
  PiBooks,
  PiBug,
  PiFlask,
  PiFolder,
  PiGitBranch,
  PiMagnifyingGlass,
  PiTerminal,
} from "react-icons/pi";

interface ISidebarViewButtonProps {
  icon: IconType;
  isActive: boolean;
  onClick: () => void;
}

interface ISidebarViewToggleButtonProps {
  icon: IconType;
  id: string;
}

interface ISidebarViewTabButtonProps {
  icon: IconType;
  id: string;
}

export function SidebarView() {
  return (
    <div className="w-14 h-full bg-ctp-crust p-2 flex flex-col gap-2">
      <SidebarViewTabButton icon={PiFolder} id="explorer" />
      <SidebarViewTabButton icon={PiMagnifyingGlass} id="search" />
      <SidebarViewTabButton icon={PiGitBranch} id="git" />
      <SidebarViewTabButton icon={PiBooks} id="packages" />
      <SidebarViewTabButton icon={PiBug} id="debug" />
      <SidebarViewTabButton icon={PiFlask} id="tests" />
      <div className="w-full flex grow"></div>
      <SidebarViewToggleButton icon={PiTerminal} id="terminal" />
    </div>
  );
}

function SidebarViewButton(props: ISidebarViewButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
        props.isActive
          ? "bg-ctp-lavender/20"
          : "bg-ctp-crust hover:bg-ctp-lavender/10"
      }`}
    >
      <props.icon className="w-6 h-6 text-ctp-lavender" />
    </button>
  );
}

function SidebarViewTabButton(props: ISidebarViewTabButtonProps) {
  const activeViewId = useSidebarViewState((state) => state.activeViewId);
  const setActiveViewId = useSidebarViewState((state) => state.setActiveViewId);

  return (
    <SidebarViewButton
      icon={props.icon}
      isActive={activeViewId === props.id}
      onClick={() => setActiveViewId(props.id)}
    />
  );
}

function SidebarViewToggleButton(props: ISidebarViewToggleButtonProps) {
  const activatedViewIds = useSidebarViewState(
    (state) => state.activatedViewIds,
  );
  const activateViewId = useSidebarViewState((state) => state.activateViewId);
  const deactivateViewId = useSidebarViewState(
    (state) => state.deactivateViewId,
  );

  return (
    <SidebarViewButton
      icon={props.icon}
      isActive={activatedViewIds.includes(props.id)}
      onClick={() => {
        if (activatedViewIds.includes(props.id)) deactivateViewId(props.id);
        else activateViewId(props.id);
      }}
    />
  );
}
