"use client";

import { FC } from "react";

interface IHeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onSave: () => void;
  onPublish: () => void;
  isPublished: boolean;
}

export const Header: FC<IHeaderProps> = ({
  title,
  onTitleChange,
  onSave,
  onPublish,
  isPublished,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled Quiz"
        className="text-xl font-bold border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="space-x-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Save
        </button>

        <button
          onClick={onPublish}
          disabled={isPublished}
          className={`px-4 py-2 rounded text-white transition ${
            isPublished
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isPublished ? "Published" : "Publish"}
        </button>
      </div>
    </header>
  );
};
