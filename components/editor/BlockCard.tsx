"use client";

import { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TQuizBlock, BlockTypeEnum } from "@/models/quiz";

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
      className={`flex items-center justify-between gap-3   
                  rounded-2xl border border-slate-300 bg-white p-5 shadow-md 
                  ${selected ? "ring-2 ring-emerald-400" : ""}`}
      onClick={() => onSelect(block.id)}
    >
      <div className="flex-1">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
          {block.type}
        </div>
        <div className="text-base break-words text-gray-800 // larger font + darker text">
          {subtitle}
        </div>
      </div>

      <button
        {...attributes}
        {...listeners}
        className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 cursor-move"
        title="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
      >
        ↕
      </button>

      <button
        className="px-3 py-2 text-sm border rounded-lg hover:bg-red-100 text-red-600 font-medium"
        title="Delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(block.id);
        }}
      >
        ✕
      </button>
    </div>
  );
};
