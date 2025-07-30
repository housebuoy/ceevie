"use client";
import { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { FiPlus } from "react-icons/fi";
import { MdPerson, MdPublic, MdAddAPhoto, MdDelete } from "react-icons/md";

export default function BasicsPanel() {
  const { resume, setResume } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers for main fields
  const handleFieldChange = (key: string, value: string) => {
    setResume(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handler for contact fields
  const handleContactChange = (key: string, value: string) => {
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value,
      },
      
    }));
  };

  // Handler for avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setResume(prev => ({
          ...prev,
          avatar: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setResume(prev => ({
      ...prev,
      avatar: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Custom fields (optional: you can store them in resume.contact.customFields or similar)
  const customFields = resume.contact?.customFields || [];
  const addCustomField = () => {
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        customFields: [
          ...(prev.contact?.customFields || []),
          { label: "", value: "", key: `custom-${Date.now()}` }
        ]
      }
    }));
  };
  const handleCustomFieldChange = (idx: number, key: "label" | "value", value: string) => {
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        customFields: customFields.map((f, i) =>
          i === idx ? { ...f, [key]: value } : f
        ),
      }
    }));
  };
  const removeCustomField = (idx: number) => {
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        customFields: customFields.filter((_, i) => i !== idx),
      }
    }));
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-[#232323] rounded-full p-2"><MdPerson size={25} className="text-white" /></span>
        <h2 className="text-2xl font-bold">Basics</h2>
      </div>

      {/* Picture */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          {resume.avatar ? (
            <>
            {/* eslint-disable-next-line */}
              <img
                src={resume.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#232323] transition"
              />
              <button
                className="absolute top-0 cursor-pointer right-0 w-16 h-16 flex items-center justify-center backdrop-blur-md bg-black/40 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                onClick={handleDelete}
                title="Delete image"
                type="button"
              >
                <MdDelete className="text-white" size={24} />
              </button>
            </>
          ) : (
            <button className="w-16 h-16 rounded-full bg-[#232323] flex items-center justify-center text-gray-500 border-2 border-[#232323] relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <MdPerson size={32} />
              <div className="absolute -bottom-2 -right-2 bg-[#111] bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition">
                <MdAddAPhoto className="text-white" size={18} />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Picture</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              placeholder="Paste image URL or upload"
              value={resume.avatar || ""}
              onChange={e => setResume(prev => ({ ...prev, avatar: e.target.value }))}
            />
            <MdPublic className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Fields */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Full Name</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.name || ""}
          onChange={e => handleFieldChange("name", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Headline</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.title || ""}
          onChange={e => handleFieldChange("title", e.target.value)}
        />
      </div>
      {/* Contact Fields */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.contact?.email || ""}
          onChange={e => handleContactChange("email", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Website</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.contact?.website || ""}
          onChange={e => handleContactChange("website", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Phone</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.contact?.phone || ""}
          onChange={e => handleContactChange("phone", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Location</label>
        <input
          className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
          value={resume.contact?.location || ""}
          onChange={e => handleContactChange("location", e.target.value)}
        />
      </div>
      {/* Custom Fields */}
      {customFields.map((field, idx) => (
        <div key={field.key} className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <input
            className="p-2 rounded bg-[#181818] border border-[#333] text-white w-full"
            placeholder="Field name (e.g. LinkedIn, GitHub)"
            value={field.label}
            onChange={e => handleCustomFieldChange(idx, "label", e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="p-2 rounded bg-[#181818] border border-[#333] text-white flex-1 w-full"
              placeholder="Field value"
              value={field.value}
              onChange={e => handleCustomFieldChange(idx, "value", e.target.value)}
            />
            <button
              className="text-red-400 hover:text-red-600"
              onClick={() => removeCustomField(idx)}
              type="button"
              title="Remove field"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
      <button
        className="flex items-center gap-2 border border-[#222] text-white px-4 py-2 rounded hover:bg-[#181818] transition"
        type="button"
        onClick={addCustomField}
      >
        <FiPlus />
        Add a custom field
      </button>
    </section>
  );
}