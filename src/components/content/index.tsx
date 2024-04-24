import { useEffect, useState } from "react";
import CustomQuillEditor from "../quill_editor";
import PencilIcon from "../icons/pencil";
import { ContentDocument } from "@/types/common";
import { documentService } from "@/services";
import XMarkIcon from "../icons/x-mark";
import ClipboardDocumentCheckIcon from "../icons/clipboard-document-check";
import ArrowUTurnLeftIcon from "../icons/arrow-uturn-left";
import toast, { Toaster } from "react-hot-toast";

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
    const response = documentService.saveDocument(payload);
    getDocument(id);
    toast.success(response.message, {
      duration: 2000,
    });
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
    <div className="w-full h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col gap-5  p-10">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between z-10">
          <div className="flex gap-x-3 md:gap-x-10 h-20 rounded-md items-center">
            {isEditTitle ? (
              <input
                type="text"
                className="text-black w-[200px] md:w-[300px] px-2 py-1 md:px-3 md:py-2 text-xl md:text-2xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setIsEditTitle(!isEditTitle);
                  }
                }}
              />
            ) : (
              <h1 className="text-2xl">{title}</h1>
            )}
            {isEditTitle ? (
              <XMarkIcon
                className="cursor-pointer"
                onClick={() => setIsEditTitle(!isEditTitle)}
              />
            ) : (
              <PencilIcon
                onClick={() => {
                  setIsEditTitle(!isEditTitle);
                }}
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="flex justify-between md:gap-x-3">
            <button
              onClick={handleSaveDocument}
              className="inline-flex h-8 md:h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-x-3"
            >
              <p className="text-sm md:text-md">Save</p>
              <ClipboardDocumentCheckIcon className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-8 md:h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-x-3"
            >
              <p className="text-sm md:text-md">Back</p>
              <ArrowUTurnLeftIcon className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        <div className="z-10">
          <TextContent onChange={(text) => setContent(text)} text={content} />
        </div>
      </div>
      <Toaster position="top-right" />
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
