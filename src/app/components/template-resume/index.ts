import ModernTemplate from "@/app/components/templates/ModernTemplate";
import {TwoColumnTemplate} from "@/app/components/templates/TwoColumnTemplate";
import CompactResume from "@/app/components/templates/CompactTemplate";
import {ModernResume} from "@/app/components/templates/TemplateWithBg";

export const templates = [
  { id: "T0001", label: "Modern", component: ModernTemplate },
  { id: "T0002", label: "Two Column", component: TwoColumnTemplate },
  { id: "T0003", label: "Modern Resume", component: ModernResume },
  { id: "T0004", label: "Compact", component: CompactResume },

];