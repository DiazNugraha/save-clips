import { ContentDocument } from "@/types/common";

export default function Card({
  document,
  onClick,
}: Readonly<{
  document: ContentDocument;
  onClick: (id: string) => void;
}>) {
  return (
    <div className="" onClick={() => onClick(document.id)}>
      <h1>{document.title}</h1>
      <p>{document.id}</p>
    </div>
  );
}
