'use client';
// import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImportResumeModal from "@/app/components/Modals/ImportResume";
import { useRouter } from "next/navigation";
import { IoCloudUpload } from "react-icons/io5";
import { TbLibraryPlus } from "react-icons/tb";
// import { MdFileCopy } from "react-icons/md";



export default function ImportResumeChooserModal({ triggerClassName = "" }) {
//   const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={triggerClassName}>
          <span className="flex flex-col items-center gap-2">
            <IoCloudUpload className="w-10 h-10" />
            <span className="text-sm font-medium">Import from existing</span>
            <span className="text-xs text-gray-400">(PDF, DOCX, JSON)</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d0d] border border-gray-700 text-white rounded-md w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Select from Library Card */}
            <button
                onClick={() => router.push("/dashboard/uploads")}
                className="rounded-lg cursor-pointer border border-gray-700 bg-[#181818] hover:bg-[#232323] p-6 flex flex-col items-start text-left transition group focus:outline-none"
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                <TbLibraryPlus className="text-indigo-400 text-2xl" />
                <span className="font-semibold text-lg">Select from Library</span>
                </div>
                <span className="text-xs text-gray-400 text-center">
                Choose a previously uploaded resume from your library.
                </span>
            </button>

            {/* Upload New Card */}
            <ImportResumeModal />
            </div>
      </DialogContent>
    </Dialog>
  );
}