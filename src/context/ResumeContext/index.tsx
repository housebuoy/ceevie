// context/ResumeContext.tsx
import { createContext, useContext, useState } from "react";
import { Resume } from "@/types/resume";

const ResumeContext = createContext<{
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}>({
  resume: {} as Resume,
  setResume: () => {},
});

export function ResumeProvider({ children, initialResume }: { children: React.ReactNode, initialResume: Resume }) {
  const [resume, setResume] = useState<Resume>(initialResume);
  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}