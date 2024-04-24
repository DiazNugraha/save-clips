import React, { useEffect, useRef } from "react";

interface OutsideProps extends React.HTMLAttributes<HTMLInputElement> {
  onClick?: () => void;
}

// Outside component observe document click outside the children container
export default function Outside({
  children,
  onClick = () => {},
  ...props
}: OutsideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = ({ target }: MouseEvent) => {
      const container = containerRef.current;

      const isTargetOutSide =
        (container && container === target) ||
        (container && !container.contains(target as Node));

      if (isTargetOutSide) onClick();
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () =>
      document.removeEventListener("click", handleDocumentClick, true);
  }, [onClick]);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
}
