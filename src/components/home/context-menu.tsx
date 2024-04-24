import TrashIcon from "../icons/trash";
import Outside from "../outside";

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  clientX: number;
  clientY: number;
  onRemove: () => void;
}

export default function ContextMenu(props: Readonly<ContextMenuProps>) {
  const { isOpen, onClose, clientX, clientY, onRemove } = props;
  if (!isOpen) return null;
  return (
    <Outside onClick={() => onClose()}>
      <div
        className="w-52 bg-white absolute z-50 flex flex-col p-2"
        style={{ top: clientY, left: clientX }}
      >
        <span
          className="w-full bg-red-400 flex justify-center rounded-md hover:bg-red-600 text-black px-3 py-2 cursor-pointer"
          onClick={onRemove}
        >
          <TrashIcon />
        </span>
      </div>
    </Outside>
  );
}
