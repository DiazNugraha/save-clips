import { documentService } from "@/services";
import { ContentDocument, ContextMenuItem } from "@/types/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import DocumentPlusIcon from "../icons/document-plus";
import { HoverEffect } from "../ui/card-hover-effect";
import ContextMenu from "./context-menu";

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

  const handleResetContext = () => {
    setOnOpenContextMenu(false);
    setSelectedId(undefined);
    setContextMenuItem(undefined);
  };

  const handleRemoveDocument = () => {
    if (!selectedId) {
      return;
    }
    documentService.removeDocument(selectedId);
    handleResetContext();
    getDocuments();
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="relative w-full h-screen p-10">
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
      <ContextMenu
        isOpen={onOpenContextMenu}
        onClose={() => handleResetContext()}
        clientX={contextMenuItem?.xPos ?? 0}
        clientY={contextMenuItem?.yPos ?? 0}
        onRemove={() => {
          handleRemoveDocument();
        }}
      />
      <ButtonAdd onClick={handleClickNewDocument} />
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
