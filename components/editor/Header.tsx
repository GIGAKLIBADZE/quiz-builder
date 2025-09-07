"use client";

import { FC } from "react";
import Link from "next/link";

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
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Home
        </Link>
        <input
          className="text-xl font-semibold outline-none border-b border-transparent focus:border-slate-400"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Quiz"
        />
      </div>

      <div className="space-x-2">
        <button
          onClick={onSave}
          className="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          Save
        </button>

        <button
          onClick={onPublish}
          disabled={isPublished}
          className={`px-4 py-2 rounded-xl text-white focus:outline-none focus:ring-2
             ${
               isPublished
                 ? "bg-slate-400 cursor-not-allowed"
                 : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300"
             }`}
        >
          {isPublished ? "Published" : "Publish"}
        </button>
      </div>
    </header>
  );
};
