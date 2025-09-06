"use client";

import { FC } from "react";
import { QuizBlock } from "@/storage/types";

interface ISidebarRightProps {
  block: QuizBlock | null;
  onUpdateBlock: (updatedBlock: QuizBlock) => void;
}

export const SidebarRight: FC<ISidebarRightProps> = ({
  block,
  onUpdateBlock,
}) => {
  if (!block) {
    return (
      <aside className="w-1/4 bg-gray-50 border-l p-4">
        <p className="text-gray-500">Select a block to edit its properties</p>
      </aside>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...block,
      props: { ...block.props, text: e.target.value },
    });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...block,
      props: { ...block.props, question: e.target.value },
    });
  };

  return (
    <aside className="w-1/4 bg-gray-50 border-l p-4">
      <h2 className="font-bold mb-4">Properties</h2>

      {block.type === "header" ||
      block.type === "footer" ||
      block.type === "button" ? (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Text</label>
          <input
            type="text"
            value={block.props.text}
            onChange={handleTextChange}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : null}

      {block.type === "question" ? (
        <div>
          <label className="block font-semibold mb-1">Question</label>
          <input
            type="text"
            value={block.props.question}
            onChange={handleQuestionChange}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : null}
    </aside>
  );
};
