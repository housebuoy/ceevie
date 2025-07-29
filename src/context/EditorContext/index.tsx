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
};

export const EditorContext = createContext<EditorContextType>({
  editors: {},
  setEditor: () => {},
  activeEditorKey: "",
  setActiveEditorKey: () => {},
  selectedSection: "basics",
  setSelectedSection: () => {},
});

export function useEditorContext() {
  return useContext(EditorContext);
}

export function EditorContextProvider({ children }: { children: ReactNode }) {
  const [editors, setEditors] = useState<Record<string, Editor | undefined>>({});
  const [activeEditorKey, setActiveEditorKey] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("basics");

  const setEditor = (key: string, editor: Editor) => {
    setEditors(prev => ({ ...prev, [key]: editor }));
  };

  return (
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
      {children}
    </EditorContext.Provider>
  );
}