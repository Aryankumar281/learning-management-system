"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState } from "react";
export function RichTextEditor({field}:{field:any}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert w-full !max-w-none ",
      },
    },
    onUpdate:({editor})=>{
        
        field.onChange(JSON.stringify(editor.getJSON()))
    },
    content: field.value ? JSON.parse(field.value):'<p>Hello world</p>',
    immediatelyRender: false,
  });

  // 🔥 Forces React to re-render when Tiptap state changes
  const [, setRerender] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const rerender = () => setRerender((x) => x + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);     

    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  return (
    <div className="border rounded-lg w-full border-input overflow-hidden dark:bg-input/30 ">
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
      />
    </div>
  );
}
