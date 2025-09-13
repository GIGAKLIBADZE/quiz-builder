import { TQuiz } from "@/models/quiz";
import { exampleQuizzes, STORAGE_KEY } from "@/models/quiz";
import { load, save } from "./localStorage";

function getAll(): TQuiz[] {
  const arr = load<TQuiz[]>(STORAGE_KEY, []);
  const byId = new Map<string, TQuiz>();

  for (const q of arr) {
    const id = q.id || crypto.randomUUID();
    const withId: TQuiz = { ...q, id };
    const prev = byId.get(id);
    if (!prev || new Date(withId.updatedAt) > new Date(prev.updatedAt)) {
      byId.set(id, withId);
    }
  }
  return Array.from(byId.values());
}

function get(id: string): TQuiz | undefined {
  return getAll().find((q) => q.id === id);
}

function saveQuiz(quiz: TQuiz) {
  const quizzes = getAll();
  const idx = quizzes.findIndex((q) => q.id === quiz.id);
  if (idx >= 0) quizzes[idx] = quiz;
  else quizzes.push(quiz);
  save(STORAGE_KEY, quizzes);
}

function remove(id: string) {
  const quizzes = getAll().filter((q) => q.id !== id);
  save(STORAGE_KEY, quizzes);
}

function seed() {
  if (localStorage.getItem(STORAGE_KEY + ".init")) return;
  save(STORAGE_KEY, exampleQuizzes);
  localStorage.setItem(STORAGE_KEY + ".init", "true");
}

export const quizService = {
  getAll,
  get,
  save: saveQuiz,
  remove,
  seed,
};
