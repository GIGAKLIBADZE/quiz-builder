import { QuizBlock, Quiz } from "./types";
import { exampleQuizzes, STORAGE_KEY } from "./constants";

export function safeParse<T>(data: string | null, fallback: T): T {
    try {
        return data ? (JSON.parse(data) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function getQuizzes(): Quiz[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = safeParse<Quiz[]>(raw, []);
    const byId = new Map<string, Quiz>();
    for (const q of arr) {
      const id = q.id || crypto.randomUUID();
      const withId: Quiz = { ...q, id };
      const prev = byId.get(id);
    if (!prev || new Date(withId.updatedAt) > new Date(prev.updatedAt)) {
      byId.set(id, withId);
    }
  }
  return Array.from(byId.values());

}

export function getQuiz(id?: string): Quiz | undefined {
    if (!id) return undefined;
    return getQuizzes().find((quiz) => quiz.id === id);
}

export function saveQuiz(quiz: Quiz) {
    try {  
      const quizzes = getQuizzes();
      const quizIndex = quizzes.findIndex((q) => q.id === quiz.id);

      if (quizIndex >= 0) {
        quizzes[quizIndex] = quiz;
      } else {
        quizzes.push(quiz);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (err) {
        console.error("Failed to save the quiz..", err);
        alert("Failed to save the quiz.");
    }
}

export function deleteQuiz(id: string) {
    try {
      const quizzes = getQuizzes().filter((quiz) => quiz.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
}

export function seedQuizzes() {
    const initialized = localStorage.getItem(STORAGE_KEY + ".init");
    if (initialized) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exampleQuizzes));
      localStorage.setItem(STORAGE_KEY + ".init", "true");
    } catch (err) {
      console.error("Failed to seed those quizzes", err);
    }
}