'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiMenu, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type Certification = {
  name: string;
  date?: string;
};

export default function CertificationsPanel() {
  const { resume, setResume } = useResume();
  const certifications: Certification[] = resume.certifications || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newCert, setNewCert] = useState<{ name: string; date: Date | null }>({
    name: "",
    date: null,
  });

  // Drag-and-drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(certifications);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      certifications: reordered,
    }));
  };

  const handleCreate = () => {
    if (!newCert.name.trim()) return;
    setResume(prev => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          name: newCert.name.trim(),
          date: newCert.date ? newCert.date.toISOString().split("T")[0] : undefined,
        },
      ],
    }));
    setShowDialog(false);
    setNewCert({ name: "", date: null });
  };

  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <FiMenu size={22} className="text-white" />
        </span>
        <h2 className="text-3xl font-bold">Certifications</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="certifications">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {certifications.map((cert, idx) => (
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
                        <div className="font-bold text-white">{cert.name}</div>
                        {cert.date && (
                          <div className="text-gray-400 text-xs">
                            {cert.date}
                          </div>
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
            <h3 className="text-lg font-bold">Add Certification</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-4"
            value={newCert.name}
            onChange={e => setNewCert(c => ({ ...c, name: e.target.value }))}
            placeholder="e.g. AWS Certified Developer"
          />
          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-[#181818] border border-[#333] text-white"
                >
                  {newCert.date ? format(newCert.date, "PPP") : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#181818] border border-[#333]">
                <Calendar
                  mode="single"
                  selected={newCert.date ?? undefined}
                  onSelect={date => setNewCert(c => ({ ...c, date: date ?? null }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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