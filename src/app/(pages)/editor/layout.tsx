'use client';
import TopToolbar from "@/app/components/ui/TopToolbar";
import SidebarNav from "@/app/components/ui/SidebarNav";
import BasicsPanel from "@/app/components/ui/sections/BasicsPanel";
import { useState } from "react";

export default function EditorLayout({  }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState("basics");

  const sectionComponents: Record<string, React.ReactNode> = {
    basics: <BasicsPanel />,
    // summary: <SummaryPanel />,
    // profiles: <ProfilesPanel />,
    // ...add other sections here
  };


  return (
    <div className="flex flex-col h-screen w-full">
      <TopToolbar />
      <div className="flex flex-1 pt-[92px]">
        <SidebarNav selected={selected} onSelect={setSelected} />
        <main className="flex-1 flex p-8 gap-8 overflow-y-auto">
            <div className="flex items-start justify-items-start">
                {sectionComponents[selected] || <div>Select a section</div>}
            </div>
        </main>
      </div>
    </div>
  );
}