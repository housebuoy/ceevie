"use client";
import { useRef, useState } from "react";
import { MdPerson, MdAdd, MdPublic, MdAddAPhoto, MdDelete } from "react-icons/md";

export default function BasicsPanel() {
  const [fields, setFields] = useState([
    { label: "Full Name", value: "John Doe", key: "fullName" },
    { label: "Headline", value: "Creative and Innovative Web Developer", key: "headline" },
    { label: "Email", value: "john.doe@gmail.com", key: "email" },
    { label: "Website", value: "https://johns-portfolio.com", key: "website" },
    { label: "Phone", value: "(555) 123-4567", key: "phone" },
    { label: "Location", value: "Pleasantville, CA", key: "location" },
  ]);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPictureUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPictureUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // For custom fields
  const [customFields, setCustomFields] = useState<{ label: string; value: string; key: string }[]>([]);

  const handleFieldChange = (key: string, value: string) => {
    setFields(fields.map(f => f.key === key ? { ...f, value } : f));
  };

  // const handleCustomFieldChange = (key: string, value: string) => {
  //   setCustomFields(customFields.map(f => f.key === key ? { ...f, value } : f));
  // };

const addCustomField = () => {
  setCustomFields([
    ...customFields,
    { label: "", value: "", key: `custom-${Date.now()}` }
  ]);
};

  return (
    <section className="max-w-lg w-full mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <MdPerson size={28} className="text-white" />
        <h2 className="text-3xl font-bold">Basics</h2>
      </div>

      {/* Picture */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          {pictureUrl ? (
            <>
            {/* eslint-disable-next-line */}
              <img
                src={pictureUrl}
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
              <div
                className="absolute -bottom-2 -right-2 bg-[#111] bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition"
              >
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
              value={pictureUrl}
              onChange={e => setPictureUrl(e.target.value)}
            />
            <MdPublic className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Fields */}
      {fields.map(field => (
        <div key={field.key} className="mb-4">
          <label className="block text-sm mb-1">{field.label}</label>
          <input
            className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
            value={field.value}
            onChange={e => handleFieldChange(field.key, e.target.value)}
          />
        </div>
      ))}

      {/* Custom Fields */}
      {/* Add Custom Field Button */}

      {/* Render Custom Fields */}
      {customFields.map((field, idx) => (
        <div key={field.key} className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <input
            className="p-2 rounded bg-[#181818] border border-[#333] text-white"
            placeholder="Field name (e.g. LinkedIn, GitHub)"
            value={field.label}
            onChange={e => {
              const newFields = [...customFields];
              newFields[idx].label = e.target.value;
              setCustomFields(newFields);
            }}
          />
          <div className="flex gap-2">
            <input
              className="p-2 rounded bg-[#181818] border border-[#333] text-white flex-1"
              placeholder="Field value"
              value={field.value}
              onChange={e => {
                const newFields = [...customFields];
                newFields[idx].value = e.target.value;
                setCustomFields(newFields);
              }}
            />
            <button
              className="text-red-400 hover:text-red-600"
              onClick={() => setCustomFields(customFields.filter((_, i) => i !== idx))}
              type="button"
              title="Remove field"
            >
              <MdDelete />
            </button>
          </div>
      </div>
      ))}
      <button
        className="flex items-center gap-2 text-indigo-400 hover:underline mt-2"
        onClick={addCustomField}
        type="button"
      >
        <MdAdd />
        Add a custom field
      </button> 
    </section>
  );
}