import { SidebarTabView } from "../views/SidebarTabView";
import { SidebarView } from "../views/SidebarView";
import { Bottombar } from "./Bottombar";
import { Menubar } from "./Menubar";

export function AppShell() {
  return (
    <div className="w-screen h-screen min-w-screen max-w-screen min-h-screen max-h-screen flex flex-col overflow-hidden">
      <Menubar />
      <div className="w-full h-full max-h-full overflow-hidden flex flex-row">
        <SidebarView />
        <SidebarTabView />
      </div>
      <Bottombar />
    </div>
  );
}
