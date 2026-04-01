import { useSidebarViewState } from "@/hooks/stores/useSidebarViewState";
import { SidebarTabsConfig } from "./config/sidebar";

export function SidebarTabView() {
  const activeTabId = useSidebarViewState((state) => state.activeViewId);

  const activeTab = SidebarTabsConfig.find((tab) => tab.id === activeTabId);

  if (!activeTab) return null;

  return (
    <div className="w-72 h-full flex flex-col bg-ctp-mantle">
      <div className="w-full h-9 shrink-0 flex items-center px-3.5">
        <p className="text-ctp-lavender text-[14px] font-semibold">
          {activeTab.title}
        </p>
      </div>
      <div className="w-full flex-1 min-h-0 overflow-auto">
        {activeTab.view}
      </div>
    </div>
  );
}
