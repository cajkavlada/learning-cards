"use client";

import "./styles.scss";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { forwardRef } from "react";

export const Editor = forwardRef<
  HTMLDivElement,
  { value: string; onChange?: (text?: string) => void; editable?: boolean }
>(({ value, onChange, editable = true }, ref) => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(/*{ types: [ListItem.name] }*/),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    Underline,
  ];

  return (
    <div ref={ref} className="tiptap-outer-div flex min-h-0 w-full flex-col">
      <EditorProvider
        onUpdate={({ editor }) => onChange?.(editor.getHTML())}
        editable={editable}
        slotBefore={editable ? <MenuBar value={value} /> : null}
        extensions={extensions}
        immediatelyRender={false}
        editorProps={{
          attributes: { class: "overflow-auto bg-white" },
        }}
        content={value}
      ></EditorProvider>
    </div>
  );
});

Editor.displayName = "Editor";
