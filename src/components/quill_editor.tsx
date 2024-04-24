import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// Dynamically import ReactQuill to ensure it's only loaded on the client-side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CustomQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomQuillEditor: React.FC<CustomQuillEditorProps> = ({
  value,
  onChange,
}) => {
  const handleTextChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    if (source === "user") {
      onChange(content);
    }
  };

  return (
    <ReactQuill
      id="editor"
      className="ql-custom"
      theme="snow"
      modules={modules}
      value={value}
      onChange={handleTextChange}
      placeholder="Start typing..."
    />
  );
};

export default CustomQuillEditor;
