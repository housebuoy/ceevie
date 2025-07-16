'use client'
import { Wand2 } from "lucide-react";
import React from "react";

interface TemplateCardProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function TemplateCard({ children, isActive, onClick }: TemplateCardProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const handleClick = () => {
    if (isMobile) onClick();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ❗ Prevent bubbling
    console.log("Customise button clicked");
  };

  return (
    <div
      className="relative group rounded-md border shadow-lg w-fit p-1 bg-white/20 overflow-hidden cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => {
        if (!isMobile) onClick();
      }}
    >
      <div className="w-[280px] h-[354px] sm:w-[180px] sm:h-[254px]  overflow-hidden rounded-md bg-white shadow-md">
        <div className="sm:scale-[0.23] scale-[0.36] origin-top-left pointer-events-none">
          <div className="w-[794px] h-[1123px]">{children}</div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center text-white text-sm font-medium transition-opacity duration-300
          ${
            isActive
              ? "bg-black/50 backdrop-blur-sm opacity-100"
              : "opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm"
          }`}
        >
          <button
            onClick={handleButtonClick}
            className="flex items-center gap-2 bg-[#171717] hover:bg-[#010101] px-3 py-2 rounded shadow-lg font-semibold cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            Customise
          </button>
        </div>
      </div>
    </div>
  );
}
