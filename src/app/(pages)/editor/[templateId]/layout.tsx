'use client';
import TopToolbar from "@/app/components/ui/TopToolbar";
import SidebarNav from "@/app/components/ui/SidebarNav";
import { EditorContext } from "@/context/EditorContext";
import { ResumeProvider } from "@/context/ResumeContext";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import sampleData from "@/data/sample-resume.json";
import { Resume } from "@/types/resume";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const sampleResume: Resume = sampleData;
  const [editors, setEditors] = useState<Record<string, Editor | undefined>>({});
  const [activeEditorKey, setActiveEditorKey] = useState("summary");
  const [selectedSection, setSelectedSection] = useState("basics");

  const setEditor = (key: string, editor: Editor) => {
    setEditors(prev => ({ ...prev, [key]: editor }));
  };

  return (
    <ResumeProvider initialResume={sampleResume}>
      <EditorContext.Provider
        value={{
          editors,
          setEditor,
          activeEditorKey,
          setActiveEditorKey,
          selectedSection,
          setSelectedSection,
        }}
      >
        <div className="flex flex-col h-screen w-full">
          <TopToolbar />
          <div className="flex flex-1 pt-[92px]">
            <SidebarNav selected={selectedSection} onSelect={setSelectedSection} />
            <main className="flex-1 flex p-8 gap-8 overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </EditorContext.Provider>
    </ResumeProvider>
  );
}