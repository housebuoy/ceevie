'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiMenu, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type Award = {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
};

export default function AwardsPanel() {
  const { resume, setResume } = useResume();
  const awards: Award[] = resume.awards || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newAward, setNewAward] = useState<Award>({
    title: "",
    issuer: "",
    date: "",
    description: "",
  });

  // Drag-and-drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(awards);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      awards: reordered,
    }));
  };

  const handleCreate = () => {
    if (!newAward.title.trim()) return;
    setResume(prev => ({
      ...prev,
      awards: [...(prev.awards || []), { ...newAward, title: newAward.title.trim() }],
    }));
    setShowDialog(false);
    setNewAward({ title: "", issuer: "", date: "", description: "" });
  };

  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      awards: prev.awards?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <MdOutlineEmojiEvents size={22} className="text-white" />
        </span>
        <h2 className="text-3xl font-bold">Awards</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="awards">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {awards.map((award, idx) => (
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
                        <div className="font-bold text-white">{award.title}</div>
                        {award.issuer && <div className="text-gray-400 text-xs">{award.issuer}</div>}
                        {award.date && <div className="text-gray-500 text-xs">{award.date}</div>}
                        {award.description && <div className="text-gray-300 text-xs mt-1">{award.description}</div>}
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
            <h3 className="text-lg font-bold">Add Award</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newAward.title}
            onChange={e => setNewAward(a => ({ ...a, title: e.target.value }))}
            placeholder="e.g. Hackathon Winner"
          />
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newAward.issuer}
            onChange={e => setNewAward(a => ({ ...a, issuer: e.target.value }))}
            placeholder="Issuer (optional)"
          />
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newAward.date}
            onChange={e => setNewAward(a => ({ ...a, date: e.target.value }))}
            placeholder="Date (optional)"
          />
          <textarea
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newAward.description}
            onChange={e => setNewAward(a => ({ ...a, description: e.target.value }))}
            placeholder="Description (optional)"
          />
          <button
            className="mt-2 bg-white text-black px-4 py-2 rounded"
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