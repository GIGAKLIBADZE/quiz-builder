"use client";

import { useQuizzes } from "@/hooks/useQuizzes";
import { useRouter } from "next/navigation";
import { TQuiz } from "@/models/quiz";
import QuizTable from "@/components/quiz/QuizTable";

export default function QuizListPage() {
  const { quizzes, addOrUpdateQuiz } = useQuizzes();
  const router = useRouter();

  const handleCreate = () => {
    const newQuiz: TQuiz = {
      id: crypto.randomUUID(),
      title: "Untitled Quiz",
      blocks: [],
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addOrUpdateQuiz(newQuiz);
    router.push(`/quiz/edit/${newQuiz.id}`);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleCreate}
      >
        Create a quiz
      </button>

      <QuizTable quizzes={quizzes} />
    </div>
  );
}
