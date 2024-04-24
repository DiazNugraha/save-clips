import Content from "@/components/content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [idDocument, setIdDocument] = useState<string>("");

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setIdDocument(router.query.id as string);
    }
  }, [router.isReady]);

  return (
    <div className="w-full">
      <Content id={idDocument} />
    </div>
  );
}
