"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Header } from "@/components/editor/Header";
import { SidebarLeft } from "@/components/editor/LeftSideBar";
import { Canvas } from "@/components/editor/Canvas";
import { SidebarRight } from "@/components/editor/RightSideBar";
import { TQuiz, TQuizBlock, BlockTypeEnum } from "@/models/quiz";
import { arrayMove } from "@dnd-kit/sortable";
import { Loading } from "./components/Loading";
import { useQuizzes } from "@/hooks/useQuizzes";

export default function EditQuizPage() {
  const { getQuiz, addOrUpdateQuiz } = useQuizzes();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [quiz, setQuiz] = useState<TQuiz | null>(null);
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

  const addBlock = (type: BlockTypeEnum) => {
    let newBlock: TQuizBlock;

    switch (type) {
      case BlockTypeEnum.HEADER:
        newBlock = {
          id: crypto.randomUUID(),
          type,
          props: { text: "New Heading" },
        };
        break;

      case BlockTypeEnum.FOOTER:
        newBlock = {
          id: crypto.randomUUID(),
          type,
          props: { text: "Footer text" },
        };
        break;

      case BlockTypeEnum.BUTTON:
        newBlock = {
          id: crypto.randomUUID(),
          type,
          props: { text: "Button" },
        };
        break;

      case BlockTypeEnum.QUESTION:
        newBlock = {
          id: crypto.randomUUID(),
          type,
          props: {
            question: "New Question?",
            options: [],
            type: "single",
          },
        };
        break;

      default:
        throw new Error("Unknown block type");
    }

    setQuiz({
      ...quiz!,
      blocks: [...quiz!.blocks, newBlock],
      updatedAt: new Date().toISOString(),
    });
  };

  const updateBlock = (updatedBlock: TQuizBlock) => {
    setQuiz({
      ...quiz,
      blocks: quiz.blocks.map((b) =>
        b.id === updatedBlock.id ? updatedBlock : b
      ),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = () => {
    if (!quiz) return;
    addOrUpdateQuiz(quiz);
    alert("Quiz saved!");
  };

  const handlePublish = () => {
    if (!quiz) return;
    const updatedQuiz = {
      ...quiz,
      published: true,
      updatedAt: new Date().toISOString(),
    };
    setQuiz(updatedQuiz);
    addOrUpdateQuiz(updatedQuiz);
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
