"use client";

import { FC } from "react";

interface ISidebarLeftProps {
  onAddBlock: (type: "header" | "question" | "button" | "footer") => void;
}

export const SidebarLeft: FC<ISidebarLeftProps> = ({ onAddBlock }) => {
  const blocks = [
    { type: "header", label: "Heading" },
    { type: "question", label: "Question" },
    { type: "button", label: "Button" },
    { type: "footer", label: "Footer" },
  ];

  return (
    <aside className="w-1/4 bg-gray-50 border-r p-4">
      <h2 className="font-bold mb-4">Blocks</h2>
      <ul className="space-y-2">
        {blocks.map((block) => (
          <li key={block.type}>
            <button
              className="w-full text-left px-3 py-2 bg-white border rounded hover:bg-gray-100 transition"
              onClick={() => onAddBlock(block.type as any)}
            >
              {block.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
