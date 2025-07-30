// app/editor/[templateId]/page.tsx
'use client';
import { useParams } from "next/navigation";
// import { useState } from "react";
import { TemplatePreview } from "@/app/components/TemplatePreview";
import BasicsPanel from "@/app/components/ui/sections/BasicsPanel";
import ProfilesPanel from "@/app/components/ui/sections/ProfilesPanel";
import dynamic from "next/dynamic";
import sampleData from "@/data/sample-resume.json";
import { Resume } from "@/types/resume";
import { useEditorContext } from "@/context/EditorContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { TbZoomReset } from "react-icons/tb";
import SkillsPanel from "@/app/components/ui/sections/SkillsPanel";
import LanguagesPanel from "@/app/components/ui/sections/LanguagesPanel";
import AwardsPanel from "@/app/components/ui/sections/AwardsPanel";
import CertificationsPanel from "@/app/components/ui/sections/CertificationsPanel";
import InterestsPanel from "@/app/components/ui/sections/InterestsPanel";
import ProjectsPanel from "@/app/components/ui/sections/ProjectsPanel";
import ReferencesPanel from "@/app/components/ui/sections/ReferencesPanel";
import PublicationsPanel from "@/app/components/ui/sections/PublicationsPanel";
import VolunteeringPanel from "@/app/components/ui/sections/VolunteeringPanel";



const DynamicSummaryPanel = dynamic(
  () => import("@/app/components/ui/sections/SummaryPanel"),
  { ssr: false }
);

const DynamicEducationPanel = dynamic(
  () => import("@/app/components/ui/sections/EducationPanel"),
  { ssr: false }
);

const DynamicExperiencePanel = dynamic(
  () => import("@/app/components/ui/sections/ExperiencePanel"),
  { ssr: false }
);

export default function EditorPage() {
  const params = useParams();
  const templateId = params.templateId as string;
  const { selectedSection } = useEditorContext();
  // const [editor, setEditor] = useState<any>(undefined);  

  // Load your resume data (replace with real data as needed)
  const resumeData: Resume = sampleData as Resume;
  console.log("template id: ",templateId)
  const sectionComponents: Record<string, React.ReactNode> = {
    basics: <BasicsPanel />,
    summary: <DynamicSummaryPanel />,
    profiles: <ProfilesPanel />,
    education: <DynamicEducationPanel />,
    experience: <DynamicExperiencePanel />,
    skills: <SkillsPanel />,
    languages: <LanguagesPanel />,
    awards: <AwardsPanel />,
    certifications: <CertificationsPanel />,
    interests: <InterestsPanel />,
    projects: <ProjectsPanel />,
    publications: <PublicationsPanel />,
    volunteering: <VolunteeringPanel />,
    references: <ReferencesPanel />,
  };

  return (
    <div className="flex w-full h-screen gap-4">
      {/* Left: Section Editor */}
      <div className="w-1/3 h-full ">
        <ScrollArea className="h-full w-full">
          {sectionComponents[selectedSection] || <div>Select a section</div>}
        </ScrollArea>
      </div>
      {/* Right: Live Template Preview */}
      <div className="w-2/3 h-full">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          wheel={{ step: 0.1 }}
          doubleClick={{ disabled: true }}
          pinch={{ step: 0.05 }}
          panning={{disabled: false}}
          centerOnInit
          limitToBounds={false}
        >
          {/* eslint-disable-next-line */}
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              {/* Zoom Controls */}
              <div className="relative h-full w-full overflow-hidden" style={{ touchAction: "none" }}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center bg-[#181818] rounded shadow-lg border border-[#232323]">
                  <button onClick={() => zoomOut()} className="border px-2 py-1 rounded">
                    <FiZoomOut size={20} />
                  </button>
                  <button onClick={() => zoomIn()} className="border px-2 py-1 rounded">
                    <FiZoomIn size={20} />
                  </button>
                  <button onClick={() => resetTransform()} className="border px-2 py-1 rounded">
                    <TbZoomReset size={20} />
                  </button>
                </div>
                <TransformComponent>
                  <TemplatePreview templateId={templateId} resume={resumeData} />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}


