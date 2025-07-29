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
import { MdSchool } from "react-icons/md";
import { useResume } from "@/context/ResumeContext";
import { FaGripLinesVertical } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Resume } from "@/types/resume";
import { format } from "date-fns"
import { useEditorContext } from "@/context/EditorContext";

type EducationForm = {
  school: string;
  location: string;
  degree: string;
  startDate: Date | null;
  endDate: Date | null;
  url: string;
  summary: string;
};

export default function EducationPanel() {
  const { resume, setResume } = useResume();
  const educations: Resume["education"] = resume.education || [];
  const [showDialog, setShowDialog] = useState(false);
  const { setEditor, setActiveEditorKey } = useEditorContext();
  const [newEdu, setNewEdu] = useState<EducationForm>({
    school: "",
    location: "",
    degree: "",
    startDate: null,
    endDate: null,
    url: "",
    summary: "",
  });

  // Tiptap editor for summary
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
        placeholder: "Write a brief summary about this education...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    immediatelyRender: false,
    content: newEdu.summary,
    onUpdate: ({ editor }) => {
      setNewEdu((prev) => ({
        ...prev,
        summary: editor.getHTML(),
      }));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] p-4 bg-[#181818] border border-[#333] rounded text-white focus:outline-none",
      },
    },
    onCreate: ({ editor }) => {
      setEditor("education", editor); // <-- register with context
      console.log("Editor registered: education", editor);
    },
    onFocus: () => {
      setActiveEditorKey("education"); // <-- set as active when focused
      console.log("Editor focused: education");
    },
  });

  const handleCreate = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          school: newEdu.school,
          location: newEdu.location,
          degree: newEdu.degree,
          startDate: newEdu.startDate ? newEdu.startDate.toISOString().split("T")[0] : "",
          endDate: newEdu.endDate ? newEdu.endDate.toISOString().split("T")[0] : "",
          url: newEdu.url,
          summary: newEdu.summary,
        },
      ],
    }));
    setShowDialog(false);
    setNewEdu({
      school: "",
      location: "",
      degree: "",
      startDate: null,
      endDate: null,
      url: "",
      summary: "",
    });
    editor?.commands.setContent(""); // Clear editor
  };

  const handleDelete = (idx: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <MdSchool size={25} className="text-white" />
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="ml-auto">
          <FiEdit3 size={22} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {educations.map((edu, idx) => (
          <div key={idx} className="flex items-center bg-[#181818] border border-[#222] rounded p-4 mb-2">
            <FaGripLinesVertical className="text-gray-500 mr-3" />
            <div className="flex-1 ml-3">
              <div className="font-bold text-white">{edu.school}</div>
              <div className="text-gray-400 text-sm">{edu.degree}</div>
              <div className="text-xs text-gray-500">
                {edu.startDate && edu.endDate
                  ? `${edu.startDate} - ${edu.endDate}`
                  : edu.startDate
                  ? `${edu.startDate} - Present`
                  : ""}
              </div>
              {edu.location && <div className="text-xs text-gray-400">{edu.location}</div>}
              {edu.summary && (
                <div
                  className="text-xs text-gray-300 mt-2"
                  dangerouslySetInnerHTML={{ __html: edu.summary }}
                />
              )}
            </div>
            {edu.url && (
              <a
                href={edu.url}
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
            <h3 className="text-lg font-bold">Create a new item</h3>
            <button
              onClick={() => setShowDialog(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">School</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newEdu.school}
                onChange={(e) =>
                  setNewEdu((p) => ({ ...p, school: e.target.value }))
                }
                placeholder="University of California"
              />
            </div>
            <div>
              <label className="block mb-1">Degree</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newEdu.degree}
                onChange={(e) =>
                  setNewEdu((p) => ({ ...p, degree: e.target.value }))
                }
                placeholder="Bachelor's"
              />
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newEdu.location}
                onChange={(e) =>
                  setNewEdu((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Berkeley, CA"
              />
            </div>
            <div>
              <label className="block mb-1">Website</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newEdu.url}
                onChange={(e) =>
                  setNewEdu((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://university.edu"
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
                        {newEdu.startDate ? format(newEdu.startDate, "PPP") : "Start Date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                        <Calendar
                        mode="single"
                        selected={newEdu.startDate ?? undefined}
                        onSelect={date => setNewEdu(p => ({ ...p, startDate: date ?? null }))}
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
                        {newEdu.endDate ? format(newEdu.endDate, "PPP") : "End Date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                        <Calendar
                        mode="single"
                        selected={newEdu.endDate ?? undefined}
                        onSelect={date => setNewEdu(p => ({ ...p, endDate: date ?? null }))}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            </div>
          <div className="mb-4">
            <label className="block mb-1">Summary</label>
            <EditorContent editor={editor} />
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