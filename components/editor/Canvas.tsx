"use client";

import { FC } from "react";
import { QuizBlock } from "@/storage/types";

interface ICanvasProps {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

export const Canvas: FC<ICanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
}) => {
  return (
    <main className="flex-1 bg-white p-4 overflow-auto">
      {blocks.length === 0 ? (
        <p className="text-gray-400">
          Drag a block from the left to start building your quiz.
        </p>
      ) : (
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className={`p-3 border rounded cursor-pointer transition ${
                block.id === selectedBlockId
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              {block.type.toUpperCase()} - {JSON.stringify(block.props)}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
