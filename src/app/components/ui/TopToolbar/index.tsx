'use client';
import {
  MdUndo, MdRedo, MdPrint, MdFormatBold, MdFormatItalic, MdFormatUnderlined,
  MdLink, MdImage, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight,
  MdFormatListBulleted, MdFormatListNumbered, MdCloudDownload, MdViewModule, MdPalette
} from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useEditorContext } from "@/context/EditorContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fonts = ["Inter", "Merriweather", "Roboto", "Montserrat"];
const fontSizes = [10, 11, 12, 14, 16, 18, 20];
const layouts = ["One Column", "Two Column"];
const themes = ["Dark", "Light", "Blue", "Green"];

export default function TopToolbar() {
  const router = useRouter();
  const { editors, activeEditorKey, font, setFont } = useEditorContext();
  const activeEditor = editors[activeEditorKey];
  console.log("TopToolbar context:", font, setFont);
  const [fontSize, setFontSize] = useState(fontSizes[1]);
  const [layout, setLayout] = useState(layouts[0]);
  const [theme, setTheme] = useState(themes[0]);
  //eslint-disable-next-line
  const [_, setRerender] = useState(0);

  // Force re-render on editor state change
  useEffect(() => {
    if (!activeEditor) return;
    const update = () => setRerender(r => r + 1);
    activeEditor.on('transaction', update);
    return () => {
      activeEditor.off('transaction', update);
    };
  }, [activeEditor]);

  const handleBold = () => {
    if (activeEditor) {
      activeEditor.chain().focus().toggleBold().run();
    } else {
      console.warn("No active editor found", { editors, activeEditorKey });
    }
  };

  const handleItalic = () => {
    if (activeEditor) {
      activeEditor.chain().focus().toggleItalic().run();
    } else {
      console.warn("No active editor found", { editors, activeEditorKey });
    }
  };

  const handleUnderline = () => {
    if (activeEditor) {
      activeEditor.chain().focus().toggleUnderline().run();
    } else {
      console.warn("No active editor found", { editors, activeEditorKey });
    }
  };

  return (
    <div className="bg-[#181818] border-b border-[#232323] fixed top-0 left-0 w-full z-50">
      {/* Top Row: App Name and Menus */}
      {/* Toolbar Row */}
      <div className="flex items-center gap-2 px-4 py-1 bg-[#111]">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/images/logo/Ceevie.png"
            alt="logo"
            width={30}
            height={30}
          />
        </ Link>   
        <Link href="/dashboard/home" className="text-white font-semibold text-lg">
          <IoHome size={18} />
        </Link>
        <ToolbarButton tooltip="Undo"><MdUndo size={18} /></ToolbarButton>
        <ToolbarButton tooltip="Redo"><MdRedo size={18} /></ToolbarButton>
        <ToolbarButton tooltip="Print"><MdPrint size={18} /></ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <Dropdown
          label={<MdViewModule size={18} />}
          value={layout}
          options={layouts}
          onChange={v => setLayout(String(v))}
          tooltip="Layout"
        />
        <Dropdown
          label={<MdPalette size={18} />}
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
          fontDropdown={true}
        />
        <Dropdown
          label={fontSize}
          value={fontSize}
          options={fontSizes}
          onChange={v => setFontSize(Number(v))}
          tooltip="Font Size"
        />
        <ToolbarButton
          tooltip="Bold"
          onClick={handleBold}
          active={!!activeEditor?.isActive("bold")}
        >
          <MdFormatBold size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Italic"
          onClick={handleItalic}
          active={!!activeEditor?.isActive("italic")}
        >
          <MdFormatItalic size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Underline"
          onClick={handleUnderline}
          active={!!activeEditor?.isActive("underline")}
        >
          <MdFormatUnderlined size={18} />
        </ToolbarButton>
        <ToolbarButton tooltip="Link"><MdLink size={18} /></ToolbarButton>
        <ToolbarButton tooltip="Image"><MdImage size={18} /></ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <ToolbarButton
          tooltip="Align Left"
          onClick={() => activeEditor?.chain().focus().setTextAlign('left').run()}
          active={!!activeEditor?.isActive({ textAlign: 'left' })}
        >
          <MdFormatAlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align Center"
          onClick={() => activeEditor?.chain().focus().setTextAlign('center').run()}
          active={!!activeEditor?.isActive({ textAlign: 'center' })}
        >
          <MdFormatAlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align Right"
          onClick={() => activeEditor?.chain().focus().setTextAlign('right').run()}
          active={!!activeEditor?.isActive({ textAlign: 'right' })}
        >
          <MdFormatAlignRight size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Bulleted List"
          onClick={() => activeEditor?.chain().focus().toggleBulletList().run()}
          active={!!activeEditor?.isActive('bulletList')}
        >
          <MdFormatListBulleted size={18} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Numbered List"
          onClick={() => activeEditor?.chain().focus().toggleOrderedList().run()}
          active={!!activeEditor?.isActive('orderedList')}
        >
          <MdFormatListNumbered size={18} />
        </ToolbarButton>
        <span className="mx-2 text-gray-500">|</span>
        <ToolbarButton tooltip="Download"><MdCloudDownload size={18} /></ToolbarButton>
        <div className="ml-auto flex items-center gap-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-full transition">Share</button>
          {/* eslint-disable-next-line */}
          <img src="https://avatars.githubusercontent.com/u/144398545?s=48&v=4" width={54} height={54} alt="User" className="w-8 h-8 rounded-full ml-2" />
        </div>
      </div>
    </div>
  );
}

// Tooltip Button Component
function ToolbarButton({
  tooltip,
  children,
  onClick,
  active = false,
}: {
  tooltip: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`p-2 rounded transition ${
            active ? "bg-indigo-600 text-white" : "hover:bg-[#232323]"
          }`}
          onClick={onClick}
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