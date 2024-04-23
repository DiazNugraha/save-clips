import { documentService } from "@/services";
import { ContentDocument } from "@/types/common";
import { useEffect, useState } from "react";
import Card from "./card";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

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
    <div className="relative w-full h-full">
      {documents.map((document, index) => {
        return <Card key={index} document={document} onClick={handleOnClick} />;
      })}
      <div
        className="absolute top-1 right-1 w-40 h-40 bg-white text-4xl flex items-center justify-center rounded-full text-black"
        onClick={handleClickNewDocument}
      >
        +
      </div>
    </div>
  );
}
