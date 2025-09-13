"use client";

import { TQuiz } from "@/models/quiz";
import QuizRow from "./QuizRoW";

interface QuizTableProps {
  quizzes: TQuiz[];
}

export default function QuizTable({ quizzes }: QuizTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Title</th>
          <th className="py-2">Updated At</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => <QuizRow key={quiz.id} quiz={quiz} />)
        ) : (
          <tr>
            <td colSpan={3} className="py-4 text-center text-gray-500">
              There are no quizzes yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
