"use client";

import { FC } from "react";
import { TQuiz } from "@/models/quiz";

interface INotPublishedProps {
  quiz: TQuiz | null;
}

export const NotPublished: FC<INotPublishedProps> = ({ quiz }) => (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-2">{quiz?.title}</h1>
    <div className="rounded border border-yellow-300 bg-yellow-50 text-yellow-800 p-4">
      Not published yet.
    </div>
  </div>
);
