"use client";

import { useState } from "react";
import { Header } from "@/components/editor/Header";
import { SidebarLeft } from "@/components/editor/LeftSideBar";
import { Canvas } from "@/components/editor/Canvas";
import { SidebarRight } from "@/components/editor/RightSideBar";
import { TQuiz, TQuizBlock, BlockTypeEnum } from "@/storage/types";
import { saveQuiz } from "@/storage/quizzes";
import { arrayMove } from "@dnd-kit/sortable";

export default function NewQuizPage() {
  const [quiz, setQuiz] = useState<TQuiz>({
    id: crypto.randomUUID(),
    title: "Untitled Quiz",
    blocks: [],
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const touch = () =>
    setQuiz((q) => ({ ...q, updatedAt: new Date().toISOString() }));

  const addBlock = (type: BlockTypeEnum) => {
    const newBlock: TQuizBlock = {
      id: crypto.randomUUID(),
      type,
      props:
        type === BlockTypeEnum.HEADER || type === BlockTypeEnum.FOOTER
          ? {
              text:
                type === BlockTypeEnum.HEADER ? "New Heading" : "Footer text",
            }
          : type === BlockTypeEnum.QUESTION
          ? { question: "New Question?", options: [], type: "single" }
          : { text: "Button" },
    };
    setQuiz((q) => ({ ...q, blocks: [...q.blocks, newBlock] }));
    touch();
  };

  const updateBlock = (updatedBlock: TQuizBlock) => {
    setQuiz((q) => ({
      ...q,
      blocks: q.blocks.map((b) =>
        b.id === updatedBlock.id ? updatedBlock : b
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const onReorder = (activeId: string, overId: string) => {
    setQuiz((q) => {
      const oldIndex = q.blocks.findIndex((b) => b.id === activeId);
      const newIndex = q.blocks.findIndex((b) => b.id === overId);
      if (oldIndex < 0 || newIndex < 0) return q;
      const blocks = arrayMove(q.blocks, oldIndex, newIndex);
      return { ...q, blocks, updatedAt: new Date().toISOString() };
    });
  };

  const onDeleteBlock = (id: string) => {
    setQuiz((q) => ({
      ...q,
      blocks: q.blocks.filter((b) => b.id !== id),
      updatedAt: new Date().toISOString(),
    }));
    setSelectedBlockId((sel) => (sel === id ? null : sel));
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
          onReorder={onReorder}
          onDeleteBlock={onDeleteBlock}
        />
        <SidebarRight block={selectedBlock} onUpdateBlock={updateBlock} />
      </div>
    </div>
  );
}
