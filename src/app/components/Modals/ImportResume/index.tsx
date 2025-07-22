'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoCloudUpload, IoClose } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // ShadCN Progress
import { cn } from "@/lib/utils"; // optional for class merging
import { useAuth } from '@/context/AuthContext'
import { MdFileCopy } from "react-icons/md";

interface ImportResumeModalProps {
  initialFile?: File | null;
  onClose?: () => void;
  hideTrigger?: boolean;
}

export default function ImportResumeModal({ initialFile, onClose, hideTrigger }: ImportResumeModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { appUser } = useAuth();

  useEffect(() => {
    if (initialFile) setFile(initialFile);
  }, [initialFile]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleImport = () => {
  if (!file) return;

  setIsUploading(true);
  setUploadProgress(0);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", appUser?._id ?? "");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(percent);
    }
  };

  xhr.onload = () => {
    setIsUploading(false);
    if (xhr.status === 200) {
      setUploadProgress(100);
      setFile(null);
      // Optionally, handle response: JSON.parse(xhr.responseText)
    } else {
      alert("Upload failed. Please try again.");
    }
  };

  xhr.onerror = () => {
    setIsUploading(false);
    alert("Upload failed. Please try again.");
  };

  xhr.send(formData);
};
  return (
    <Dialog onOpenChange={open => { if (!open && onClose) onClose(); }}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <button
              className="rounded-lg cursor-pointer border border-gray-700 bg-[#181818] hover:bg-[#232323] p-6 flex flex-col items-center transition group focus:outline-none"
            >
              <div className="flex flex-col items-center gap-2 mb-2">
              <MdFileCopy className="text-indigo-400 text-2xl text-center" />
              <span className="font-semibold text-lg text-center w-full">Upload New</span>
              </div>
              <span className="text-xs text-gray-400 text-center">
              Import a new resume file (PDF, DOCX, JSON).
              </span>
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="bg-[#0d0d0d] border border-gray-700 text-white rounded-md w-full max-w-md">
        <DialogHeader className="mb-4 flex justify-between items-center">
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>

        <div
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            "border border-dashed rounded-md p-6 text-center transition-all cursor-pointer",
            file
              ? "border-green-500 bg-[#1a1a1a]"
              : "border-gray-600 hover:border-gray-400 bg-[#0d0d0d]"
          )}
        >
          <IoCloudUpload size={28} className="mx-auto text-white mb-2" />
          <p className="text-sm font-medium">
            {file ? "File ready to upload" : "Upload file"}
          </p>
          <p className="text-xs text-gray-400">
            Drag & drop or click to browse (max. 10MB)
          </p>
          <input
            type="file"
            accept=".pdf,.docx,.json"
            ref={inputRef}
            hidden
            onChange={handleFileChange}
          />
        </div>

        {/* File preview or no file message */}
        {file ? (
          <div className="mt-4 p-2 border rounded-md bg-[#111111] flex items-center justify-between">
            <span className="truncate text-sm">{file.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setFile(null)}
            >
              <IoClose />
            </button>
          </div>
        ) : (
          <p className="text-sm text-center text-gray-500 mt-3">
            No file uploaded
          </p>
        )}

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="bg-gray-700" />
            <p className="text-xs text-center mt-1 text-gray-400">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleImport}
          disabled={!file || isUploading || !appUser?._id}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white w-full"
        >
          {isUploading ? "Uploading..." : "Upload & Import"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
