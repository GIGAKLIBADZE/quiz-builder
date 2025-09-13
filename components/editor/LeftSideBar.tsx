"use client";

import { FC } from "react";
import { blocks } from "./constants";
import { BlockListItem } from "./components/BlockItem";
import { BlockTypeEnum } from "@/models/quiz";

interface ISidebarLeftProps {
  onAddBlock: (type: BlockTypeEnum) => void;
}

export const SidebarLeft: FC<ISidebarLeftProps> = ({ onAddBlock }) => (
  <aside className="w-1/4 bg-white border-r p-4">
    <h2 className="font-bold mb-4">Blocks</h2>
    <ul className="space-y-2">
      {blocks.map((block) => (
        <BlockListItem
          key={block.type}
          type={block.type}
          label={block.label}
          onAddBlock={onAddBlock}
        />
      ))}
    </ul>
  </aside>
);
