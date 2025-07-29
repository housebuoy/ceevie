// components/ui/SidebarNav.tsx
import {
  MdPerson, MdShortText, MdSchool, MdWork, MdStar, MdCardMembership,
  MdTranslate, MdEmojiEvents, MdInterests, MdBuild, MdMenuBook, MdVolunteerActivism,
  MdContactMail, MdOutlinePlaylistAdd, MdShare 
} from "react-icons/md";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const sections = [
  { key: "basics", label: "Basic", icon: <MdPerson size={18} /> },
  { key: "summary", label: "Summary", icon: <MdShortText size={18} /> },
  { key: "profiles", label: "Profiles", icon: <MdShare  size={18} /> },
  { key: "education", label: "Education", icon: <MdSchool size={18} /> },
  { key: "experience", label: "Experience", icon: <MdWork size={18} /> },
  { key: "skills", label: "Skills", icon: <MdStar size={18} /> },
  { key: "languages", label: "Languages", icon: <MdTranslate size={18} /> },
  { key: "awards", label: "Awards", icon: <MdEmojiEvents size={18} /> },
  { key: "certifications", label: "Certifications", icon: <MdCardMembership size={18} /> },
  { key: "interests", label: "Interests", icon: <MdInterests size={18} /> },
  { key: "projects", label: "Projects", icon: <MdBuild size={18} /> },
  { key: "publications", label: "Publications", icon: <MdMenuBook size={18} /> },
  { key: "volunteering", label: "Volunteering", icon: <MdVolunteerActivism size={18} /> },
  { key: "references", label: "References", icon: <MdContactMail size={18} /> },
  { key: "custom", label: "Custom Field", icon: <MdOutlinePlaylistAdd  size={18} /> },
];

export default function SidebarNav({ selected, onSelect }: { selected: string, onSelect: (key: string) => void }) {
  return (
    <nav className="w-12 bg-[#111] flex flex-col items-center py-4 gap-2 border-r border-[#222] shadow-lg">
      {sections.map((section) => (
        <Tooltip key={section.key}>
          <TooltipTrigger asChild>
            <button
              className={`p-2 rounded flex flex-col items-center transition
                ${selected === section.key ? "bg-[#232323] text-indigo-400" : "hover:bg-[#232323] text-white"}`}
              onClick={() => onSelect(section.key)}
            >
              {section.icon}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-white text-black text-xs rounded px-2 py-1 shadow-lg">
            {section.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}