import { documentService } from "@/services";
import { ContentDocument, ContextMenuItem } from "@/types/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import DocumentPlusIcon from "../icons/document-plus";
import { HoverEffect } from "../ui/card-hover-effect";
import ContextMenu from "./context-menu";
import { twMerge } from "tailwind-merge";
import GithubIcon from "../icons/github-icon";
import LinkedinIcon from "../icons/linkedin-icon";
import TwitterIcon from "../icons/twitter-icon";
import toast, { Toaster } from "react-hot-toast";
import ExportIcon from "../icons/export-icon";
import ImportIcon from "../icons/import-icon";

export default function HomePage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<ContentDocument[]>([]);
  const [onOpenContextMenu, setOnOpenContextMenu] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [contextMenuItem, setContextMenuItem] = useState<ContextMenuItem>();

  const getDocuments = () => {
    const data = documentService.getDocuments();
    if (data) {
      setDocuments(data);
    }
  };

  const handleOnClick = (id: string) => {
    router.push(`/${id}`);
  };

  const handleClickNewDocument = () => {
    const newId = uuidv4();
    handleOnClick(newId);
  };

  const handleExport = () => {
    const data = documentService.getDocuments();
    if (data) {
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.download = `documents-${date.getTime()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            const data = JSON.parse(e.target.result as string);
            const response = documentService.saveBatchDocuments(data);
            toast.success(response.message, {
              duration: 2000,
            });
            getDocuments();
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetContext = () => {
    setOnOpenContextMenu(false);
    setSelectedId(undefined);
    setContextMenuItem(undefined);
  };

  const handleRemoveDocument = () => {
    if (!selectedId) {
      return;
    }
    const response = documentService.removeDocument(selectedId);
    handleResetContext();
    toast.success(response.message, {
      duration: 2000,
    });
    getDocuments();
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="w-full h-screen p-10 dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <InformationBar />
      <div className="w-full flex gap-x-3 mt-3 justify-start z-10">
        <button
          className="bg-black border-[1px] p-5 border-slate-600 rounded-2xl text-white flex items-center gap-2"
          onClick={handleImport}
        >
          Import
          <Circle className="w-10 h-10">
            <ImportIcon color="white" />
          </Circle>
        </button>
        <button
          className="bg-black border-[1px] p-5 border-slate-600 rounded-2xl text-white flex items-center gap-2"
          onClick={handleExport}
        >
          <span>Export</span>
          <Circle className="w-10 h-10">
            <ExportIcon color="white" />
          </Circle>
        </button>
      </div>
      <div className="w-full h-full">
        <HoverEffect
          items={documents}
          onClick={handleOnClick}
          onContextMenu={(id, xPos, yPos) => {
            setOnOpenContextMenu(!onOpenContextMenu);
            setSelectedId(id);
            setContextMenuItem({
              xPos,
              yPos,
            });
          }}
        />
        <ButtonAdd onClick={handleClickNewDocument} />
      </div>
      <ContextMenu
        isOpen={onOpenContextMenu}
        onClose={() => handleResetContext()}
        clientX={contextMenuItem?.xPos ?? 0}
        clientY={contextMenuItem?.yPos ?? 0}
        onRemove={() => {
          handleRemoveDocument();
        }}
      />
      <Toaster position="top-right" />
    </div>
  );
}

function ButtonAdd({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <div
      className="absolute bottom-6 right-6 w-20 h-20 hover:scale-110 bg-white text-4xl flex items-center justify-center rounded-full text-black"
      onClick={onClick}
    >
      <DocumentPlusIcon className="cursor-pointer w-10 h-10" />
    </div>
  );
}

function InformationBar() {
  return (
    <div className="w-full bg-black border-[1px] p-5 border-slate-600 rounded-2xl text-white z-10 flex flex-col md:flex-row justify-between gap-3">
      <p className="text-4xl font-bold">Save Clips</p>
      <div className="flex gap-2">
        <Circle className="w-10 h-10">
          <a href="https://github.com/DiazNugraha/save-clips" target="_blank">
            <GithubIcon />
          </a>
        </Circle>
        <Circle className="w-10 h-10">
          <a
            href="https://www.linkedin.com/in/diaz-nugraha-820342246/"
            target="_blank"
          >
            <LinkedinIcon />
          </a>
        </Circle>
        <Circle className="w-10 h-10">
          <a href="https://twitter.com/NugrahaDiaz_" target="_blank">
            <TwitterIcon />
          </a>
        </Circle>
      </div>
    </div>
  );
}

function Circle({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={twMerge(
        "w-3 h-3 flex items-center justify-center cursor-pointer rounded-full bg-slate-600",
        className
      )}
    >
      {children}
    </div>
  );
}
