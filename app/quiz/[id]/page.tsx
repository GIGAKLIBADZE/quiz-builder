"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuizzes } from "@/hooks/useQuizzes";
import { TQuiz } from "@/models/quiz";
import { Loading } from "./components/Loading";
import { NotPublished } from "./components/NotPublished";
import { BlockRenderer } from "./components/BlockRenderer/BlockRenderer";

export default function QuizRenderPage() {
  const { getQuiz } = useQuizzes();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [quiz, setQuiz] = useState<TQuiz | null>(null);

  useEffect(() => {
    if (!id) return;
    const q = getQuiz(id);
    if (!q) {
      alert("Quiz not found");
      router.push("/");
      return;
    }
    setQuiz(q);
  }, [id, router]);

  if (!quiz) {
    return <Loading />;
  }

  if (!quiz.published) {
    return <NotPublished quiz={quiz} />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      {quiz.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
