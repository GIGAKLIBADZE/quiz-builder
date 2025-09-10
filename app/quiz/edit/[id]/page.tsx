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
import { arrayMove } from "@dnd-kit/sortable";
import { Loading } from "./components/Loading";

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

  if (!quiz) return <Loading />;

  const addBlock = (type: QuizBlock["type"]) => {
    const newBlock: QuizBlock = {
      id: crypto.randomUUID(),
      type,
      props: {},
    };

    switch (type) {
      case "header":
        newBlock.props = { text: "New Heading" };
        break;
      case "footer":
        newBlock.props = { text: "Footer text" };
        break;
      case "question":
        newBlock.props = {
          question: "New Question?",
          options: [],
          type: "single",
        };
        break;
      case "button":
        newBlock.props = { text: "Button" };
        break;
      default:
        newBlock.props = {};
    }

    setQuiz({
      ...quiz,
      blocks: [...quiz.blocks, newBlock],
      updatedAt: new Date().toISOString(),
    });
  };

  const updateBlock = (updatedBlock: QuizBlock) => {
    setQuiz({
      ...quiz,
      blocks: quiz.blocks.map((b) =>
        b.id === updatedBlock.id ? updatedBlock : b
      ),
      updatedAt: new Date().toISOString(),
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

  const onReorder = (activeId: string, overId: string) => {
    if (!quiz || activeId === overId) return;
    const oldIndex = quiz.blocks.findIndex((b) => b.id === activeId);
    const newIndex = quiz.blocks.findIndex((b) => b.id === overId);
    if (oldIndex < 0 || newIndex < 0) return;
    setQuiz({
      ...quiz,
      blocks: arrayMove(quiz.blocks, oldIndex, newIndex),
      updatedAt: new Date().toISOString(),
    });
  };

  const onDeleteBlock = (id: string) => {
    if (!quiz) return;
    setQuiz({
      ...quiz,
      blocks: quiz.blocks.filter((b) => b.id !== id),
      updatedAt: new Date().toISOString(),
    });
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const onTitleChange = (title: string) => setQuiz({ ...quiz, title });

  return (
    <div className="flex flex-col h-screen">
      <Header
        title={quiz.title}
        onTitleChange={onTitleChange}
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
          onReorder={onReorder}
          onDeleteBlock={onDeleteBlock}
        />
        <SidebarRight block={selectedBlock} onUpdateBlock={updateBlock} />
      </div>
    </div>
  );
}
