"use client";

import { FC } from "react";
import { BlockTypeEnum, TQuizBlock } from "@/storage/types";
import { SelectTutorial } from "./components/SelectTutorial";
import { TextInputField } from "./components/TextInputField";

interface ISidebarRightProps {
  block: TQuizBlock | null;
  onUpdateBlock: (updatedBlock: TQuizBlock) => void;
}

export const SidebarRight: FC<ISidebarRightProps> = ({
  block,
  onUpdateBlock,
}) => {
  if (!block) {
    return <SelectTutorial />;
  }

  const handleTextChange = (value: string) => {
    onUpdateBlock({
      ...block,
      props: { ...block.props, text: value },
    });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...block,
      props: { ...block.props, question: e.target.value },
    });
  };

  const isSomeVariable =
    block.type === BlockTypeEnum.HEADER ||
    block.type === BlockTypeEnum.FOOTER ||
    block.type === BlockTypeEnum.BUTTON;

  return (
    <aside className="w-1/4 bg-white border-l p-4">
      <h2 className="font-bold mb-4">Properties</h2>

      {isSomeVariable ? (
        <TextInputField
          label="Text"
          value={block.props.text}
          onChange={handleTextChange}
        />
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
