"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuiz } from "@/storage/quizzes";
import { Quiz } from "@/storage/types";
import { Loading } from "./components/Loading";
import { NotPublished } from "./components/NotPublished";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { Button } from "./components/Button";
import { Footer } from "./components/Footer";

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
    return <Loading />;
  }

  if (!quiz.published) {
    return NotPublished({ quiz });
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.blocks.map((block) => {
        switch (block.type) {
          case "header": {
            const text = String(block.props?.text ?? "");
            return <Header key={block.id} id={block.id} text={text} />;
          }

          case "question": {
            const qType =
              (block.props?.type as "single" | "multi" | "text") ?? "single";
            const question = String(block.props?.question ?? "");
            const options = Array.isArray(block.props?.options)
              ? block.props.options
              : [];

            return (
              <Question
                id={block.id}
                question={question}
                options={options}
                qType={qType}
              />
            );
          }

          case "button": {
            const text = String(block.props?.text ?? "Next");
            return <Button id={block.id} text={text} />;
          }

          case "footer": {
            const text = String(block.props?.text ?? "");
            return <Footer id={block.id} text={text} />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
