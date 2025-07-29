// components/TemplatePreview.tsx
import { templates } from "@/app/components/template-resume";
import { Resume } from "@/types/resume";

export function TemplatePreview({ templateId}: { templateId: string, resume: Resume }) {
  const template = templates.find(tpl => tpl.id === templateId) || templates[0];
  const TemplateComponent = template.component;
  return <TemplateComponent/>;
}