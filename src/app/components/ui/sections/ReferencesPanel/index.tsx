import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiPlus, FiTrash2, FiEdit3 } from "react-icons/fi";
import type { Resume } from "@/types/resume";
import { MdContactMail } from "react-icons/md";

type Reference = {
  name: string;
  position: string;
  contact: string;
};

export default function ReferencesPanel() {
  const { resume, setResume } = useResume();
  const references: Resume["references"] = resume.references || [];
  const [showDialog, setShowDialog] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [newRef, setNewRef] = useState<Reference>({
    name: "",
    position: "",
    contact: "",
  });

  // Add or update reference
  const handleSave = () => {
    setResume(prev => ({
      ...prev,
      references: editIdx !== null
        ? prev.references?.map((ref, i) => i === editIdx ? newRef : ref)
        : [...(prev.references || []), newRef],
    }));
    setShowDialog(false);
    setEditIdx(null);
    setNewRef({ name: "", position: "", contact: "" });
  };

  // Edit reference
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setNewRef(references[idx]);
    setShowDialog(true);
  };

  // Delete reference
  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      references: prev.references?.filter((_, i) => i !== idx),
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <MdContactMail size={23} className="text-white" />
        </span>
        <h2 className="text-2xl font-bold">References</h2>
        <div className="ml-auto">
          <FiEdit3 size={22} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {references.length === 0 && (
          <div className="text-gray-400">No references added yet.</div>
        )}
        {references.map((ref, idx) => (
          <div key={idx} className="flex items-center bg-[#181818] border border-[#222] rounded p-4 mb-2">
            <div className="flex-1">
              <div className="font-bold text-white">{ref.name}</div>
              <div className="text-gray-400 text-sm">{ref.position}</div>
              <div className="text-xs text-gray-400">{ref.contact}</div>
            </div>
            <button className="ml-2 text-indigo-400 hover:text-indigo-600" onClick={() => handleEdit(idx)} title="Edit">
              <FiEdit3 />
            </button>
            <button className="ml-2 text-red-400 hover:text-red-600" onClick={() => handleDelete(idx)} title="Delete">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {showDialog ? (
        <div className="bg-[#181818] border border-[#222] rounded p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{editIdx !== null ? "Edit Reference" : "Add Reference"}</h3>
            <button onClick={() => { setShowDialog(false); setEditIdx(null); }} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newRef.name}
              onChange={e => setNewRef(r => ({ ...r, name: e.target.value }))}
              placeholder="Jane Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Position</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newRef.position}
              onChange={e => setNewRef(r => ({ ...r, position: e.target.value }))}
              placeholder="Senior Manager, Acme Corp"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Contact</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newRef.contact}
              onChange={e => setNewRef(r => ({ ...r, contact: e.target.value }))}
              placeholder="jane.doe@email.com / +123456789"
            />
          </div>
          <button
            className="mt-4 bg-white text-black px-4 py-2 rounded"
            onClick={handleSave}
          >
            {editIdx !== null ? "Update" : "Add"}
          </button>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-[#222] text-white px-4 py-2 rounded hover:bg-[#181818] transition"
          onClick={() => setShowDialog(true)}
          type="button"
        >
          <FiPlus />
          Add a new reference
        </button>
      )}
    </section>
  );
}