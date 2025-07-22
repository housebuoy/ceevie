'use client';
import { useAuth } from "@/context/AuthContext";
import { useFileUpload } from "@/hooks/useFileUpload";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ResumeDashboard() {
  const { appUser } = useAuth();
  type UploadedFile = {
    _id: string;
    originalName: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    uploadedBy?: {
      name?: string;
      email?: string;
    };
  };

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    file,
    setFile,
    uploadProgress,
    isUploading,
    inputRef,
    handleDrop,
    handleFileChange,
    handleUploadClick,
    handleImport,
  } = useFileUpload(appUser?._id);

  // Dummy data for files
  useEffect(() => {
      if (!appUser?._id) return;
      setLoading(true);
      fetch(`/api/upload?userId=${appUser._id}`)
        .then(res => res.json())
        .then(data => {
          setFiles(data.uploads || []);
          setLoading(false);
        });
  }, [appUser?._id]);

  return (
    <div className="pt-16 pl-12">
      <h1 className="text-3xl font-bold mb-2">My Files & Assets</h1>
      <p className="text-gray-400 mb-6">Here you can explore your uploaded files.</p>

      {/* Upload Box */}
      <div
        className="border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-xl p-8 flex flex-col items-center justify-center mb-8 bg-[#181818] cursor-pointer hover:bg-[#222] transition-all"
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <IoCloudUploadOutline size={48} className="text-indigo-400 mb-2" />
        <div className="font-semibold text-lg">
          {file ? "File ready to upload" : "Drag and drop or Click here to upload your file"}
        </div>
        <div className="text-xs text-gray-400 mb-2">
          Supported Format: PDF, DOCX, JSON (10mb each)
        </div>
        <input
          type="file"
          accept=".pdf,.docx,.json"
          ref={inputRef}
          hidden
          onChange={handleFileChange}
        />

        {/* File preview or no file message */}
        {file && (
          <div className="mt-4 p-2 border rounded-md bg-[#111111] flex items-center justify-between w-full max-w-xs">
            <span className="truncate text-sm">{file.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={e => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              <IoClose />
            </button>
          </div>
        )}

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-4 w-full max-w-xs">
            <Progress value={uploadProgress} className="bg-gray-700" />
            <p className="text-xs text-center mt-1 text-gray-400">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            handleImport();
          }}
          disabled={!file || isUploading || !appUser?._id}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white w-full max-w-xs py-2 rounded disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload & Import"}
        </button>
      </div>

      {/* File Table */}
      <div className="bg-[#181818] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <div className="font-semibold">
            Attached Files <span className="text-xs text-gray-400">({files.length} Total)</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#222] text-white px-3 py-1 rounded outline-none"
          />
        </div>
        <ScrollArea className="w-full overflow-auto rounded-md border">
        <ScrollBar orientation="horizontal" className="h-2 bg-gray-700 rounded-full"/>
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="text-gray-400 text-sm space-x-2">
                <th className="px-4 py-3">File Name</th>
                <th className="px-4 py-3">File Size</th>
                <th className="px-4 py-3">Last Modified</th>
                {/* <th className="px-4 py-3">Uploaded By</th> */}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">No files found.</td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr
                    key={file._id}
                    className="border-t border-[#222] hover:bg-[#222] odd:bg-[#111] even:bg-[#1a1a1a]"
                  >
                    <td className="py-2 flex items-center gap-2 px-4">
                      {file.fileType === "pdf" && <span className="text-red-400">📄</span>}
                      {file.fileType === "docx" && <span className="text-blue-400">📄</span>}
                      {file.fileType === "json" && <span className="text-green-400">🗎</span>}
                      {file.originalName}
                    </td>
                    <td className="px-4 py-3">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                    <td className="px-4 py-3">{new Date(file.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button className="text-red-400 hover:underline mr-4 text-sm">Delete</button>
                      <button className="text-indigo-400 hover:underline text-sm">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </ScrollArea>
        </div>
      </div>
  );
}