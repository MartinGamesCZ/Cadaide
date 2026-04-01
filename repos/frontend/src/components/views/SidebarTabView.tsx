import { useSidebarViewState } from "@/hooks/stores/useSidebarViewState";
import { SidebarTabsConfig } from "./config/sidebar";

export function SidebarTabView() {
  const activeTabId = useSidebarViewState((state) => state.activeViewId);

  const activeTab = SidebarTabsConfig.find((tab) => tab.id === activeTabId);

  if (!activeTab) return null;

  return (
    <div className="w-72 h-full flex flex-col bg-ctp-mantle">
      <div className="w-full h-10 flex items-center px-3.5">
        <p className="text-ctp-lavender text-md">{activeTab.title}</p>
      </div>
      <div className="w-full h-full">{activeTab.view}</div>
    </div>
  );
}
