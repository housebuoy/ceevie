'use client';
import {
  MdUndo, MdRedo, MdPrint, MdFormatBold, MdFormatItalic, MdFormatUnderlined,
  MdLink, MdImage, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight,
  MdFormatListBulleted, MdFormatListNumbered, MdCloudDownload, MdViewModule, MdPalette
} from "react-icons/md";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";


const fonts = ["Inter", "Merriweather", "Roboto", "Montserrat"];
const fontSizes = [10, 11, 12, 14, 16, 18, 20];
const layouts = ["One Column", "Two Column"];
const themes = ["Dark", "Light", "Blue", "Green"];

export default function TopToolbar() {

  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(fontSizes[1]);
  const [layout, setLayout] = useState(layouts[0]);
  const [theme, setTheme] = useState(themes[0]);

  return (
    <div className="bg-[#181818] border-b border-[#232323] fixed top-0 left-0 w-full z-50">
      {/* Top Row: App Name and Menus */}
      <div className="flex items-center px-4 py-2">
        <Image
            src="/images/logo/Ceevie.png"
            alt="logo"
            width={30}
            height={30}
        />
        <span className="font-bold text-lg text-white mr-6">Ceevie</span>
        <nav className="flex gap-4 text-sm text-gray-300">
          <button className="hover:text-white transition">File</button>
          <button className="hover:text-white transition">Edit</button>
          <button className="hover:text-white transition">View</button>
          <button className="hover:text-white transition">Insert</button>
          <button className="hover:text-white transition">Format</button>
          <button className="hover:text-white transition">Tools</button>
          <button className="hover:text-white transition">Help</button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-full transition">Share</button>
          {/* eslint-disable-next-line */}
          <img src="https://avatars.githubusercontent.com/u/144398545?s=48&v=4" width={54}height={54} alt="User" className="w-8 h-8 rounded-full ml-2" />
        </div>
      </div>
      {/* Toolbar Row */}
      <div className="flex items-center gap-2 px-4 py-1 bg-[#111]">
        <ToolbarButton tooltip="Undo"><MdUndo size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Redo"><MdRedo size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Print"><MdPrint size={20} /></ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <Dropdown
            label={<MdViewModule size={20} />}
            value={layout}
            options={layouts}
            onChange={v => setLayout(String(v))}
            tooltip="Layout"
        />
        <Dropdown
            label={<MdPalette size={20} />}
            value={theme}
            options={themes}
            onChange={v => setTheme(String(v))}
            tooltip="Theme"
        />
        <span className="mx-2 text-gray-500">|</span>
        <Dropdown
            label={font}
            value={font}
            options={fonts}
            onChange={v => setFont(String(v))}
            tooltip="Font"
            fontDropdown
        />
        <Dropdown
            label={fontSize}
            value={fontSize}
            options={fontSizes}
            onChange={v => setFontSize(Number(v))}
            tooltip="Font Size"
        />
        <ToolbarButton tooltip="Bold"><MdFormatBold size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Italic"><MdFormatItalic size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Underline"><MdFormatUnderlined size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Link"><MdLink size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Image"><MdImage size={20} /></ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <ToolbarButton tooltip="Align Left"><MdFormatAlignLeft size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Align Center"><MdFormatAlignCenter size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Align Right"><MdFormatAlignRight size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Bulleted List"><MdFormatListBulleted size={20} /></ToolbarButton>
        <ToolbarButton tooltip="Numbered List"><MdFormatListNumbered size={20} /></ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <ToolbarButton tooltip="Download"><MdCloudDownload size={20} /></ToolbarButton>
      </div>
    </div>
  );
}

// Tooltip Button Component
function ToolbarButton({
  tooltip,
  children,
}: {
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="p-2 rounded hover:bg-[#232323] transition"
          tabIndex={0}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}


type DropdownProps = {
  label: React.ReactNode;
  value: string | number;
  options: (string | number)[];
  onChange: (value: string | number) => void;
  tooltip: string;
  fontDropdown?: boolean;
};

function Dropdown({ label, value, options, onChange, tooltip, fontDropdown }: DropdownProps) {


  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "px-2 py-1 rounded hover:bg-[#232323] transition flex items-center gap-1 text-white",
                fontDropdown &&
                  "w-40 min-w-[8rem] max-w-[10rem] truncate overflow-hidden justify-between"
              )}
            >
              <span className={fontDropdown ? "truncate" : ""}>{label}</span>
              <span className="ml-1 text-xs text-gray-400">&#9662;</span>
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-white text-black text-xs rounded px-2 py-1 shadow-lg"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="bg-[#232323] text-white border border-[#333] mt-2">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onSelect={() => onChange(opt)}
            className={`cursor-pointer px-4 py-2 hover:bg-[#333] ${
              opt === value ? "bg-[#222]" : ""
            }`}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
