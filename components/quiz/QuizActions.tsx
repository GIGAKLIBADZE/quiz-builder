"use client";

import { useRouter } from "next/navigation";

interface QuizActionsProps {
  quizId: string;
}

export default function QuizActions({ quizId }: QuizActionsProps) {
  const router = useRouter();

  return (
    <>
      <button
        className="px-2 py-1 bg-yellow-400 text-white rounded"
        onClick={() => router.push(`/quiz/edit/${quizId}`)}
      >
        Edit
      </button>

      <button
        className="px-2 py-1 bg-green-500 text-white rounded"
        onClick={() => router.push(`/quiz/${quizId}`)}
      >
        View
      </button>
    </>
  );
}
