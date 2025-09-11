"use client";

import { FC } from "react";
import { TQuizBlock } from "@/storage/types";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { BlockCard } from "./BlockCard";

interface ICanvasProps {
  blocks: TQuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onDeleteBlock: (id: string) => void;
}

export const Canvas: FC<ICanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onReorder,
  onDeleteBlock,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <main className="flex-1 bg-slate-50 p-6 overflow-auto">
      {blocks.length === 0 ? (
        <p className="text-gray-400">
          Drag a block from the left to start building your quiz.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {blocks.map((block) => (
                <BlockCard
                  key={block.id}
                  block={block}
                  selected={block.id === selectedBlockId}
                  onSelect={onSelectBlock}
                  onDelete={onDeleteBlock}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
};
