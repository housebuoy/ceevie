'use client';
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FiEdit3, FiLink, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import { useResume } from "@/context/ResumeContext";
import { FaGripLinesVertical } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useEditorContext } from "@/context/EditorContext";
import type { Resume } from "@/types/resume";

type ExperienceForm = {
  company: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  url: string;
  location: string;
  description: string;
  highlights: string[];
  highlightInput: string;
};

export default function ExperiencePanel() {
  const { resume, setResume } = useResume();
  const experiences: Resume["experience"] = resume.experience || [];
  const [showDialog, setShowDialog] = useState(false);
  const { setEditor, setActiveEditorKey } = useEditorContext();
  const [newExp, setNewExp] = useState<ExperienceForm>({
    company: "",
    role: "",
    startDate: null,
    endDate: null,
    url: "",
    location: "",
    description: "",
    highlights: [],
    highlightInput: "",
  });

  // Tiptap editor for description
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
       types: ['heading', 'paragraph'],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Describe your role, achievements, and responsibilities...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    immediatelyRender: false,
    content: newExp.description,
    onUpdate: ({ editor }) => {
      setNewExp((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] p-4 bg-[#181818] border border-[#333] rounded text-white focus:outline-none",
      },
    },
    onCreate: ({ editor }) => {
      setEditor("experience", editor); // <-- register with context
      console.log("Editor registered: experience", editor);
    },
    onFocus: () => {
      setActiveEditorKey("experience"); // <-- set as active when focused
      console.log("Editor focused: experience");
    },
  });

  const handleCreate = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          company: newExp.company,
          role: newExp.role,
          startDate: newExp.startDate ? newExp.startDate.toISOString().split("T")[0] : "",
          endDate: newExp.endDate ? newExp.endDate.toISOString().split("T")[0] : "",
          url: newExp.url,
          location: newExp.location,
          description: newExp.description,
          highlights: newExp.highlights,
        },
      ],
    }));
    setShowDialog(false);
    setNewExp({
      company: "",
      role: "",
      startDate: null,
      endDate: null,
      url: "",
      location: "",
      description: "",
      highlights: [],
      highlightInput: "",
    });
    editor?.commands.setContent(""); // Clear editor
  };

  const handleDelete = (idx: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <MdWork size={25} className="text-white" />
        <h2 className="text-2xl font-bold">Experience</h2>
        <div className="ml-auto">
          <FiEdit3 size={22} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex items-center bg-[#181818] border border-[#222] rounded p-4 mb-2">
            <FaGripLinesVertical className="text-gray-500 mr-3" />
            <div className="flex-1 ml-3">
              <div className="font-bold text-white">{exp.company}</div>
              <div className="text-gray-400 text-sm">{exp.role}</div>
              <div className="text-xs text-gray-500">
                {exp.startDate && exp.endDate
                  ? `${exp.startDate} - ${exp.endDate}`
                  : exp.startDate
                  ? `${exp.startDate} - Present`
                  : ""}
              </div>
              {exp.location && <div className="text-xs text-gray-400">{exp.location}</div>}
              {exp.description && (
                <div
                  className="text-xs text-gray-300 mt-2"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}              
            </div>
            {exp.url && (
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-400 hover:underline break-all"
              >
                <FiLink />
              </a>
            )}
            <button
              className="ml-2 text-red-400 hover:text-red-600"
              type="button"
              title="Delete"
              onClick={() => handleDelete(idx)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {showDialog ? (
        <div className="bg-[#181818] border border-[#222] rounded p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add Experience</h3>
            <button
              onClick={() => setShowDialog(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Company</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newExp.company}
                onChange={(e) =>
                  setNewExp((p) => ({ ...p, company: e.target.value }))
                }
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newExp.role}
                onChange={(e) =>
                  setNewExp((p) => ({ ...p, role: e.target.value }))
                }
                placeholder="Frontend Developer"
              />
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newExp.location}
                onChange={(e) =>
                  setNewExp((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Accra, Ghana"
              />
            </div>
            <div>
              <label className="block mb-1">Website</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newExp.url}
                onChange={(e) =>
                  setNewExp((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://company.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date or Date Range</label>
            <div className="flex flex-col gap-2">
              {/* Start Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#181818] border border-[#333] text-white"
                  >
                    {newExp.startDate ? format(newExp.startDate, "PPP") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                  <Calendar
                    mode="single"
                    selected={newExp.startDate ?? undefined}
                    onSelect={date => setNewExp(p => ({ ...p, startDate: date ?? null }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* End Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#181818] border border-[#333] text-white"
                  >
                    {newExp.endDate ? format(newExp.endDate, "PPP") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                  <Calendar
                    mode="single"
                    selected={newExp.endDate ?? undefined}
                    onSelect={date => setNewExp(p => ({ ...p, endDate: date ?? null }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <EditorContent editor={editor} onFocus={() => setActiveEditorKey("experience")}/>
          </div>
          <Button
            className="mt-4 bg-white text-black px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-[#222] text-white px-4 py-2 rounded hover:bg-[#181818] transition"
          onClick={() => setShowDialog(true)}
          type="button"
        >
          <FiPlus />
          Add a new item
        </button>
      )}
    </section>
  );
}