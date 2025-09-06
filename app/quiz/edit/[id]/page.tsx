"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Header } from "@/components/editor/Header";
import { SidebarLeft } from "@/components/editor/LeftSideBar";
import { Canvas } from "@/components/editor/Canvas";
import { SidebarRight } from "@/components/editor/RightSideBar";
import { getQuiz, saveQuiz } from "@/storage/quizzes";
import { Quiz, QuizBlock } from "@/storage/types";

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const existingQuiz = getQuiz(id);
    if (!existingQuiz) {
      alert("Quiz not found");
      router.push("/");
      return;
    }
    setQuiz(existingQuiz);
  }, [id]);

  if (!quiz) return <p>Loading...</p>;

  const addBlock = (type: QuizBlock["type"]) => {
    const newBlock: QuizBlock = {
      id: crypto.randomUUID(),
      type,
      props:
        type === "header" || type === "footer"
          ? { text: type === "header" ? "New Heading" : "Footer text" }
          : type === "question"
          ? { question: "New Question?", options: [], type: "single" }
          : { text: "Button" },
    };
    setQuiz({ ...quiz, blocks: [...quiz.blocks, newBlock] });
  };

  const updateBlock = (updatedBlock: QuizBlock) => {
    setQuiz({
      ...quiz,
      blocks: quiz.blocks.map((b) =>
        b.id === updatedBlock.id ? updatedBlock : b
      ),
    });
  };

  const handleSave = () => {
    saveQuiz(quiz);
    alert("Quiz saved!");
  };

  const handlePublish = () => {
    const updatedQuiz = {
      ...quiz,
      published: true,
      updatedAt: new Date().toISOString(),
    };
    setQuiz(updatedQuiz);
    saveQuiz(updatedQuiz);
    alert("Quiz published!");
  };

  const selectedBlock =
    quiz.blocks.find((b) => b.id === selectedBlockId) || null;

  return (
    <div className="flex flex-col h-screen">
      <Header
        title={quiz.title}
        onTitleChange={(title) => setQuiz({ ...quiz, title })}
        onSave={handleSave}
        onPublish={handlePublish}
        isPublished={quiz.published}
      />

      <div className="flex flex-1">
        <SidebarLeft onAddBlock={addBlock} />
        <Canvas
          blocks={quiz.blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
        />
        <SidebarRight block={selectedBlock} onUpdateBlock={updateBlock} />
      </div>
    </div>
  );
}
