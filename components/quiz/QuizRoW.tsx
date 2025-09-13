"use client";

import { TQuiz } from "@/models/quiz";
import QuizActions from "./QuizActions";

interface QuizRowProps {
  quiz: TQuiz;
}

export default function QuizRow({ quiz }: QuizRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">{quiz.title}</td>
      <td className="py-2">{new Date(quiz.updatedAt).toLocaleString()}</td>
      <td className="py-2 space-x-2">
        <QuizActions quizId={quiz.id} />
      </td>
    </tr>
  );
}
