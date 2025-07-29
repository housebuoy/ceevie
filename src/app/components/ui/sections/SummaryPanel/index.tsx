"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdShortText } from "react-icons/md";
import Placeholder from '@tiptap/extension-placeholder'
import { useResume } from "@/context/ResumeContext";
import { useEditorContext } from "@/context/EditorContext"; // <-- import the context

const SummaryPanel: React.FC = () => {
  const { resume, setResume } = useResume();
  const { setEditor, setActiveEditorKey } = useEditorContext(); // <-- use the context

  const editor = useEditor({
    extensions: [StarterKit,
      Placeholder.configure({
        placeholder: 'Write a brief summary about yourself...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: resume.summary || "",
    onUpdate: ({ editor }) => {
      setResume(prev => ({
        ...prev,
        summary: editor.getHTML(),
      }));
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[120px] p-4 bg-[#181818] border border-[#333] rounded text-white focus:outline-none",
      },
    },
    onCreate: ({ editor }) => {
      setEditor("summary", editor); // <-- register with context
      // console.log("Editor registered: summary", editor);
    },
    onFocus: () => {
      setActiveEditorKey("summary"); // <-- set as active when focused
      // console.log("Editor focused: summary");
    },
  });

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <MdShortText size={25} className="text-white" />
        <h2 className="text-2xl font-bold">Summary</h2>
      </div>
      <div className="mb-2 text-gray-400 text-sm">
        This is a brief description about yourself. You can use formatting from the toolbar above
      </div>
      {/* Simple formatting toolbar */}
      <div className="flex gap-2 my-3">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-1 rounded ${editor?.isActive("bold") ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-[#181818]"}`}
          title="Bold"
          type="button"
        >
          <MdFormatBold size={18} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${editor?.isActive("italic") ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-[#181818]"}`}
          title="Italic"
          type="button"
        >
          <MdFormatItalic size={18} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded ${editor?.isActive("underline") ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-[#181818]"}`}
          title="Underline"
          type="button"
        >
          <MdFormatUnderlined size={18} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </section>
  );
};

export default SummaryPanel;