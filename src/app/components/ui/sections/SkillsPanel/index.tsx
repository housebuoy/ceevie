'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiPlus } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MdStar } from "react-icons/md";

type SkillGroup = {
  category: string;
  level: string;
  items?: string[];
};

export default function SkillsPanel() {
  const { resume, setResume } = useResume();
  const skills: SkillGroup[] = resume.skills || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newSkill, setNewSkill] = useState<SkillGroup>({
    category: "",
    level: "",
    items: [],
  });

  // Handle drag and drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(skills).map(skill => ({
    ...skill,
    items: skill.items ?? [], // ensure items is always an array
  }));
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      skills: reordered,
    }));
  };

  const handleCreate = () => {
    setResume(prev => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        { ...newSkill, items: newSkill.items ?? [] }, // ensure items is always an array
    ],
    }));
    setShowDialog(false);
    setNewSkill({ category: "", level: "", items: [] });
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
            <MdStar size={25} />
        </span>
        <h2 className="text-3xl font-bold">Skills</h2>
        {/* <div className="ml-auto">
            <MdStar size={25} />
        </div> */}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {skills.map((skill, idx) => (
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
                      <div>
                        <div className="font-bold text-white">{skill.category}</div>
                        <div className="text-gray-400 text-sm">{skill.level}</div>
                        {/* Optionally show items */}
                        {skill.items && skill.items.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">{skill.items.join(", ")}</div>
                        )}
                      </div>
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
            <h3 className="text-lg font-bold">Add Skill Group</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newSkill.category}
              onChange={e => setNewSkill(s => ({ ...s, category: e.target.value }))}
              placeholder="Web Technologies"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Level</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newSkill.level}
              onChange={e => setNewSkill(s => ({ ...s, level: e.target.value }))}
              placeholder="Advanced"
            />
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