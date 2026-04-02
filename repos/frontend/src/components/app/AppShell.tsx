import { SidebarTabView } from "../views/SidebarTabView";
import { SidebarView } from "../views/SidebarView";
import { TabbarView } from "../views/TabbarView";
import { Bottombar } from "./Bottombar";
import { Menubar } from "./Menubar";

export function AppShell() {
  return (
    <div className="w-screen h-screen min-w-screen max-w-screen min-h-screen max-h-screen flex flex-col overflow-hidden">
      <Menubar />
      <div className="w-full flex-1 min-h-0 overflow-hidden flex flex-row">
        <SidebarView />
        <SidebarTabView />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <TabbarView />
        </div>
      </div>
      <Bottombar />
    </div>
  );
}
