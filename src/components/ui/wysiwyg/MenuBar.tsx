import { useCurrentEditor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Minus,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { EditorButton } from "./EditorButton";
import { useEffect } from "react";
import { ColorPicker } from "./ColorPicker";

export function MenuBar({ value }: { value: string }) {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!value && editor) {
      editor.commands.clearContent();
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="control-group pb-2">
      <div className="flex flex-wrap gap-2">
        <EditorButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={16} />
        </EditorButton>
        <ColorPicker
          onChange={(color) => editor.chain().focus().setColor(color).run()}
        />
      </div>
    </div>
  );
}
