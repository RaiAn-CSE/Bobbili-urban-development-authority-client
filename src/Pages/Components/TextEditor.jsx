import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ setEditorContent, editorContent, extraOptions = {} }) => {
  const editor = useRef(null);
  const config = {
    readonly: false,
    placeholder: "Write your query...",
    style: {
      backgroundColor: "#f4efef",
      zIndex: 10000,
    },
    beautifyHTML: true,
    spellcheck: true,
    language: "auto",
    enter: "p",
    imageDefaultWidth: 300,
    height: 100,
    resize: false,
    showXPathInStatusbar: false,
    statusbar: false,
    addNewLine: false,
    // toolbarSticky: true,
    ...extraOptions,
  };
  return (
    <JoditEditor
      ref={editor}
      value={editorContent}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setEditorContent(newContent)}
    />
  );
};

export default TextEditor;
