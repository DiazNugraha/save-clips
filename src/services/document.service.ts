import { ContentDocument, Response, StatusResponse } from "@/types/common";

export class DocumentService {
  getDocument(id: string): ContentDocument | null {
    const documents: ContentDocument[] = JSON.parse(
      localStorage.getItem("documents") ?? ""
    );
    const document = documents.find((doc) => doc.id === id);
    if (document) return document;

    return null;
  }

  getDocuments(): ContentDocument[] {
    const documents: ContentDocument[] = JSON.parse(
      localStorage.getItem("documents") ?? ""
    );
    return documents;
  }

  saveDocument(document: ContentDocument): Response {
    const documents: ContentDocument[] = JSON.parse(
      localStorage.getItem("documents") ?? "[]"
    );
    const findDocument = documents.find((doc) => doc.id === document.id);
    if (findDocument) {
      findDocument.title = document.title;
      findDocument.content = document.content;
      localStorage.setItem("documents", JSON.stringify(documents));
      return {
        message: "Document updated successfully",
        status: StatusResponse.SUCCESS,
      };
    } else {
      documents.push(document);
      localStorage.setItem("documents", JSON.stringify(documents));
      return {
        message: "Document created successfully",
        status: StatusResponse.SUCCESS,
      };
    }
  }
}
