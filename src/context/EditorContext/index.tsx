// context/EditorContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Editor } from "@tiptap/react";

type EditorContextType = {
  editors: Record<string, Editor | undefined>;
  setEditor: (key: string, editor: Editor) => void;
  activeEditorKey: string;
  setActiveEditorKey: (key: string) => void;
  selectedSection: string;
  setSelectedSection: (key: string) => void;
  font: string;
  setFont: (font: string) => void;
};

export const EditorContext = createContext<EditorContextType>({
  editors: {},
  setEditor: () => {},
  activeEditorKey: "",
  setActiveEditorKey: () => {},
  selectedSection: "basics",
  setSelectedSection: () => {},
  font: "Inter",
  setFont: () => {},
});

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorContextProvider({ children }: { children: ReactNode }) {
  const [editors, setEditors] = useState<Record<string, Editor | undefined>>({});
  const [activeEditorKey, setActiveEditorKey] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("basics");
  const [font, setFont] = useState<string>("Inter");

  const setEditor = (key: string, editor: Editor) => {
    setEditors(prev => ({ ...prev, [key]: editor }));
  };

  console.log("EditorContextProvider mounted");
  
  

  return (
    <EditorContext.Provider
      value={{
        editors,
        setEditor,
        activeEditorKey,
        setActiveEditorKey,
        selectedSection,
        setSelectedSection,
        font,
        setFont,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}