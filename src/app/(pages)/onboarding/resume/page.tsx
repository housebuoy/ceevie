'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileUp, Plus } from 'lucide-react';
import { LuShipWheel } from 'react-icons/lu';

export default function ImportResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<'upload' | 'scratch' | null>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setSelectedOption('upload');
    }
  };

  const handleStartFromScratch = () => {
    setSelectedOption('scratch');
    setUploadedFile(null);
  };

  const isSelected = (option: 'upload' | 'scratch') => selectedOption === option;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#000000] text-white">
      {/* Background */}
      <div className="absolute top-0 h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] bg-fixed" />

      {/* Card */}
      <div className="max-w-xl w-full p-8 bg-[#0d0d0d] border z-10 border-gray-800 rounded-xl shadow-xl text-center space-y-6">
        <LuShipWheel className="text-4xl text-indigo-400 mb-2 mx-auto" />
        <h1 className="text-3xl font-bold">Import an existing resume</h1>
        <p className="text-gray-400">
          Upload your existing resume in <span className="font-medium text-white">.pdf</span>, <span className="font-medium text-white">.docx</span>, or <span className="font-medium text-white">.json</span> formats.
        </p>

        {/* Upload Card */}
        <div
          onClick={handleFileUpload}
          className={`w-full cursor-pointer p-4 rounded-lg border flex items-center gap-4 text-left transition-all
            ${isSelected('upload') ? 'border-indigo-500 bg-[#1d1d30]' : 'border-gray-700 hover:border-gray-500'}
          `}
        >
          <FileUp size={24} className="text-white" />
          <div className="flex-1">
            <p className="font-semibold">Upload Resume</p>
            <p className="text-sm text-gray-400">Choose a file to import</p>
            {uploadedFile && isSelected('upload') && (
              <p className="text-xs mt-1 text-green-400">{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</p>
            )}
          </div>
          {isSelected('upload') && <CheckCircle className="text-indigo-500" />}
        </div>
        <input
          type="file"
          accept=".pdf,.docx,.json"
          ref={fileInputRef}
          hidden
          onChange={handleFileChange}
        />

        {/* Or separator */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#0d0d0d] px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Scratch Card */}
        <div
          onClick={handleStartFromScratch}
          className={`w-full cursor-pointer p-4 rounded-lg border flex items-center gap-4 text-left transition-all
            ${isSelected('scratch') ? 'border-indigo-500 bg-[#1d1d30]' : 'border-gray-700 hover:border-gray-500'}
          `}
        >
          <Plus size={24} className="text-white" />
          <div className="flex-1">
            <p className="font-semibold">Start from Scratch</p>
            <p className="text-sm text-gray-400">Create a new resume manually</p>
          </div>
          {isSelected('scratch') && <CheckCircle className="text-indigo-500" />}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between pt-6 w-full">
          <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">
            Back
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!selectedOption}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
