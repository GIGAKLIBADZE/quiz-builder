"use client";

import { useEffect, useState } from "react";
import { TQuiz } from "@/models/quiz";
import { quizService } from "@/lib/storage/quizService";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<TQuiz[]>([]);

  useEffect(() => {
    quizService.seed();
    setQuizzes(quizService.getAll());
  }, []);

  const addOrUpdateQuiz = (quiz: TQuiz) => {
    quizService.save(quiz);
    setQuizzes(quizService.getAll());
  };

  const deleteQuiz = (id: string) => {
    quizService.remove(id);
    setQuizzes(quizService.getAll());
  };
  
   const getQuiz = (id: string) => {
    return quizService.get(id);
  };


  return {
    quizzes,
    addOrUpdateQuiz,
    deleteQuiz,
    getQuiz,
  };
}
