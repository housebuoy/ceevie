'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiMenu, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const proficiencies = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Beginner",
] as const;

type Language = {
  name: string;
  proficiency: typeof proficiencies[number];
};

export default function LanguagesPanel() {
  const { resume, setResume } = useResume();
  const languages: Language[] = resume.languages || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newLang, setNewLang] = useState<Language>({
    name: "",
    proficiency: "Fluent",
  });

  // Drag-and-drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(languages);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      languages: reordered,
    }));
  };

  const handleCreate = () => {
    setResume(prev => ({
      ...prev,
      languages: [...(prev.languages || []), newLang],
    }));
    setShowDialog(false);
    setNewLang({ name: "", proficiency: "Fluent" });
  };

  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      languages: prev.languages?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2"><FiMenu size={22} className="text-white" /></span>
        <h2 className="text-3xl font-bold">Languages</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="languages">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {languages.map((lang, idx) => (
                <Draggable key={idx} draggableId={String(idx)} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-[#181818] border border-[#222] rounded p-4 flex items-center mb-2"
                    >
                      <span {...provided.dragHandleProps} className="mr-3 cursor-grab">
                        <FaGripLinesVertical className="text-gray-500" />
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-white">{lang.name}</div>
                        <div className="text-gray-400 text-sm">{lang.proficiency}</div>
                      </div>
                      <button
                        className="ml-2 text-red-400 hover:text-red-600"
                        onClick={() => handleDelete(idx)}
                        type="button"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showDialog ? (
        <div className="bg-[#181818] border border-[#222] rounded p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add Language</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Language</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newLang.name}
              onChange={e => setNewLang(l => ({ ...l, name: e.target.value }))}
              placeholder="English"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Proficiency</label>
            <select
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newLang.proficiency}
              onChange={e => setNewLang(l => ({ ...l, proficiency: e.target.value as Language["proficiency"] }))}
            >
              {proficiencies.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <button
            className="mt-4 bg-white text-black px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-[#222] text-white px-4 py-2 rounded hover:bg-[#181818] transition w-full justify-center"
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