"use client";

import Link from "next/link";
import { useQuizzes } from "@/hooks/useQuizzes";

export default function QuizListPage() {
  const quizzes = useQuizzes();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>

      <Link href="/quiz/edit">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Create a quiz
        </button>
      </Link>

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
            quizzes.map((quiz) => (
              <tr key={quiz.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{quiz.title}</td>
                <td className="py-2">
                  {new Date(quiz.updatedAt).toLocaleString()}
                </td>
                <td className="py-2 space-x-2">
                  <Link href={`/quiz/edit/${quiz.id}`}>
                    <button className="px-2 py-1 bg-yellow-400 text-white rounded">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/quiz/${quiz.id}`}>
                    <button className="px-2 py-1 bg-green-500 text-white rounded">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500">
                There are no quizzes yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
