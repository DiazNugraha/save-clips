import { SVGProps } from "react";

export default function ImportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M23 24v-20h-8v2h6v16h-18v-16h6v-2h-8v20h22zm-12-13h-4l5 6 5-6h-4v-11h-2v11z" />
    </svg>
  );
}
