import { documentService } from "@/services";
import { ContentDocument } from "@/types/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import DocumentPlusIcon from "../icons/document-plus";
import { HoverEffect } from "../ui/card-hover-effect";

export default function HomePage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<ContentDocument[]>([]);

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

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="relative w-full h-screen">
      <HoverEffect
        items={documents}        
        onClick={handleOnClick}
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
