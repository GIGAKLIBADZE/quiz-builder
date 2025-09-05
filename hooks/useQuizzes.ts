"use client";

import { useEffect, useState } from "react";
import { getQuizzes, seedQuizzes } from "@/storage/quizzes";
import { Quiz } from "@/storage/types";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    seedQuizzes();
    setQuizzes(getQuizzes());
  }, []);

  return quizzes;
}
