import { useRef, useState, useCallback } from "react";
import { uploadResume } from "@/lib/uploadResume";

export function useFileUpload(userId?: string) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleImport = useCallback(async () => {
    if (!file || !userId) return;
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await uploadResume({
        file,
        userId,
        onProgress: setUploadProgress,
      });
      setUploadProgress(100);
      setFile(null);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [file, userId]);

  return {
    file,
    setFile,
    uploadProgress,
    isUploading,
    inputRef,
    handleDrop,
    handleFileChange,
    handleUploadClick,
    handleImport,
  };
}