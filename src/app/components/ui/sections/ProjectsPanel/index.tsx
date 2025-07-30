'use client';
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiMenu, FiPlus, FiTrash2, FiLink } from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type Project = {
  title: string;
  description: string;
  role: string;
  url?: string;
};

export default function ProjectsPanel() {
  const { resume, setResume } = useResume();
  const projects: Project[] = resume.projects || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    role: "",
    url: "",
  });

  // Drag-and-drop reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(projects);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResume(prev => ({
      ...prev,
      projects: reordered,
    }));
  };

  const handleCreate = () => {
    if (!newProject.title.trim()) return;
    setResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), { ...newProject, title: newProject.title.trim() }],
    }));
    setShowDialog(false);
    setNewProject({ title: "", description: "", role: "", url: "" });
  };

  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <FiMenu size={22} className="text-white" />
        </span>
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mb-4">
              {projects.map((project, idx) => (
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
                        <div className="font-bold text-white">{project.title}</div>
                        <div className="text-gray-400 text-sm">{project.role}</div>
                        <div className="text-xs text-gray-300 mt-1">{project.description}</div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1"
                          >
                            <FiLink /> {project.url}
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
            <h3 className="text-lg font-bold">Add Project</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newProject.title}
            onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
            placeholder="Project Title"
          />
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newProject.role}
            onChange={e => setNewProject(p => ({ ...p, role: e.target.value }))}
            placeholder="Your Role"
          />
          <textarea
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newProject.description}
            onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
            placeholder="Project Description"
          />
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white mb-2"
            value={newProject.url}
            onChange={e => setNewProject(p => ({ ...p, url: e.target.value }))}
            placeholder="https://project-url.com"
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