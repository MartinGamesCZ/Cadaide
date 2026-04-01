"use client";

import { AppShell } from "@/components/app/AppShell";
import { useProjectStore } from "@/hooks/stores/useProjectStore";

export default function Page() {
  const path = useProjectStore((state) => state.path);

  return <AppShell />;

  /*return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Menubar />
      {path ? (
        <div className="flex flex-row grow overflow-hidden">
          <Explorer />
          <CodeEditor />
        </div>
      ) : (
        <HomeScreen />
      )}
      <Bottombar />
    </div>
  );*/
}
