import { useEffect, useState } from "react";
import CustomQuillEditor from "../quill_editor";
import PencilIcon from "../icons/pencil";
import { ContentDocument } from "@/types/common";
import { documentService } from "@/services";

export default function Content({ id }: Readonly<{ id: string }>) {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSaveDocument = () => {
    const payload: ContentDocument = {
      id,
      title,
      content,
    };
    documentService.saveDocument(payload);
    getDocument(id);
  };

  const getDocument = (idDocument: string) => {
    const document = documentService.getDocument(idDocument);
    if (document) {
      setTitle(document.title);
      setContent(document.content);
    }
  };

  useEffect(() => {
    if (id) {
      getDocument(id);
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-x-2 bg-slate-500 p-4 rounded-2xl">
          {isEditTitle ? (
            <input
              type="text"
              className="text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1>{title}</h1>
          )}
          <PencilIcon
            onClick={() => {
              setIsEditTitle(!isEditTitle);
            }}
            className="cursor-pointer"
          />
        </div>
        <button onClick={handleSaveDocument}>save</button>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
      <TextContent onChange={(text) => setContent(text)} text={content} />
    </div>
  );
}

function TextContent(
  props: Readonly<{ text: string; onChange: (text: string) => void }>
) {
  const { onChange, text } = props;
  const [value, setValue] = useState("");
  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    setValue(text);
  }, [text]);
  return (
    <CustomQuillEditor value={value} onChange={(value) => setValue(value)} />
  );
}
