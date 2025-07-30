'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiMenu, FiPlus, FiTrash2, FiLink } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MdMenuBook } from "react-icons/md";

type Publication = {
  title: string;
  publisher?: string;
  date?: string;
  url?: string;
  description?: string;
};

export default function PublicationsPanel() {
  const { resume, setResume } = useResume();
  const publications: Publication[] = resume.publications || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newPub, setNewPub] = useState<{
    title: string;
    publisher: string;
    date: Date | null;
    url: string;
    description: string;
  }>({
    title: "",
    publisher: "",
    date: null,
    url: "",
    description: "",
  });

  // Drag-and-drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(publications);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      publications: reordered,
    }));
  };

  const handleCreate = () => {
    if (!newPub.title.trim()) return;
    setResume(prev => ({
      ...prev,
      publications: [
        ...(prev.publications || []),
        {
          title: newPub.title.trim(),
          publisher: newPub.publisher.trim(),
          date: newPub.date ? newPub.date.toISOString().split("T")[0] : undefined,
          url: newPub.url.trim(),
          description: newPub.description.trim(),
        },
      ],
    }));
    setShowDialog(false);
    setNewPub({
      title: "",
      publisher: "",
      date: null,
      url: "",
      description: "",
    });
  };

  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      publications: prev.publications?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <MdMenuBook size={22} className="text-white" />
        </span>
        <h2 className="text-3xl font-bold">Publications</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="publications">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {publications.map((pub, idx) => (
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
                        <div className="font-bold text-white">{pub.title}</div>
                        {pub.publisher && <div className="text-gray-400 text-xs">{pub.publisher}</div>}
                        {pub.date && <div className="text-gray-500 text-xs">{pub.date}</div>}
                        {pub.description && <div className="text-gray-300 text-xs mt-1">{pub.description}</div>}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1"
                          >
                            <FiLink /> {pub.url}
                          </a>
                        )}
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
            <h3 className="text-lg font-bold">Add Publication</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newPub.title}
            onChange={e => setNewPub(p => ({ ...p, title: e.target.value }))}
            placeholder="Publication Title"
          />
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newPub.publisher}
            onChange={e => setNewPub(p => ({ ...p, publisher: e.target.value }))}
            placeholder="Publisher"
          />
          <div className="mb-2">
            <label className="block mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-[#181818] border border-[#333] text-white"
                >
                  {newPub.date ? format(newPub.date, "PPP") : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                <Calendar
                  mode="single"
                  selected={newPub.date ?? undefined}
                  onSelect={date => setNewPub(p => ({ ...p, date: date ?? null }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newPub.url}
            onChange={e => setNewPub(p => ({ ...p, url: e.target.value }))}
            placeholder="https://publication-url.com"
          />
          <textarea
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newPub.description}
            onChange={e => setNewPub(p => ({ ...p, description: e.target.value }))}
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