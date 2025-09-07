"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuiz } from "@/storage/quizzes";
import { Quiz } from "@/storage/types";

export default function QuizRenderPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [quiz, setQuiz] = useState<Quiz | null>(null);

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
    return <div className="p-6 max-w-3xl mx-auto">Loading…</div>;
  }

  if (!quiz.published) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        <div className="rounded border border-yellow-300 bg-yellow-50 text-yellow-800 p-4">
          Not published yet.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.blocks.map((block) => {
        switch (block.type) {
          case "header": {
            const text = String(block.props?.text ?? "");
            return (
              <h2 key={block.id} className="text-xl font-semibold">
                {text}
              </h2>
            );
          }

          case "question": {
            const qType =
              (block.props?.type as "single" | "multi" | "text") ?? "single";
            const question = String(block.props?.question ?? "");
            const options = Array.isArray(block.props?.options)
              ? block.props.options
              : [];

            return (
              <div key={block.id} className="space-y-2">
                <div className="font-medium">{question}</div>

                {qType === "text" ? (
                  <input
                    className="w-full border rounded px-2 py-1"
                    placeholder="Your answer"
                  />
                ) : (
                  <div className="space-y-1">
                    {options.map((opt: any, idx: number) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type={qType === "single" ? "radio" : "checkbox"}
                          name={block.id}
                        />
                        <span>{String(opt)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          case "button": {
            const text = String(block.props?.text ?? "Next");
            return (
              <button
                key={block.id}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                type="button"
              >
                {text}
              </button>
            );
          }

          case "footer": {
            const text = String(block.props?.text ?? "");
            return (
              <footer key={block.id} className="text-sm text-gray-500">
                {text}
              </footer>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
