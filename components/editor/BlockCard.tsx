"use client";

import { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TQuizBlock, BlockTypeEnum } from "@/storage/types";

interface IBlockCardProps {
  block: TQuizBlock;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BlockCard: FC<IBlockCardProps> = ({
  block,
  selected,
  onSelect,
  onDelete,
}) => {
  const getBlockSubtitle = (block: TQuizBlock): string => {
    switch (block.type) {
      case BlockTypeEnum.HEADER:
      case BlockTypeEnum.FOOTER:
      case BlockTypeEnum.BUTTON:
        return String(block.props?.text ?? "");
      case BlockTypeEnum.QUESTION:
        return String(block.props?.question ?? "");
      default:
        return "";
    }
  };

  const subtitle: string = getBlockSubtitle(block);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm
                 ${selected ? "ring-2 ring-emerald-400" : ""}`}
      onClick={() => onSelect(block.id)}
    >
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          {block.type}
        </div>
        <div className="text-sm break-all">{subtitle}</div>
      </div>

      <button
        className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
        title="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
      >
        ↕
      </button>
    </div>
  );
};
