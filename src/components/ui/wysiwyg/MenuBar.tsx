import { type Editor, useCurrentEditor } from "@tiptap/react";
import {
  AArrowDown,
  AArrowUp,
  Bold,
  Italic,
  List,
  ListOrdered,
  Minus,
  Redo,
  Strikethrough,
  Underline,
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <Underline size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => handleEnlargeText(editor)}
          disabled={editor.isActive("heading", { level: 1 })}
        >
          <AArrowUp size={16} />
        </EditorButton>
        <EditorButton
          onClick={() => handleReduceText(editor)}
          disabled={editor.isActive("paragraph")}
        >
          <AArrowDown size={16} />
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

  type Level = 1 | 2 | 3 | 4 | 5 | 6;

  type HeadingLevel = {
    level: Level;
  };

  function handleEnlargeText(editor: Editor) {
    const heading = editor.getAttributes("heading") as HeadingLevel;
    if (!heading.level) {
      editor.chain().focus().toggleHeading({ level: 6 }).run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: (heading.level - 1) as Level })
        .run();
    }
  }

  function handleReduceText(editor: Editor) {
    const heading = editor.getAttributes("heading") as HeadingLevel;
    if (heading.level === 6) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: (heading.level + 1) as Level })
        .run();
    }
  }
}
