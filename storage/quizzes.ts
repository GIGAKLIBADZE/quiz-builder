import { QuizBlock, Quiz } from "./types";
import { exampleQuizzes, STORAGE_KEY } from "./constants";

export function safeParse<T>(data: string | null, fallback: T): T {
    try {
        return data && JSON.parse(data);
    } catch {
        return fallback;
    }
}

export function getQuizzes(): Quiz[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return safeParse(raw, []);
}

export function getQuiz(id: string) {
    return getQuizzes().find((quiz) => quiz.id === id);
}

export function saveQuiz(quiz: Quiz) {
    const quizzes = getQuizzes();
    const quizIndex = quizzes.findIndex((q) => q.id = quiz.id);

    if (quizIndex > 0) {
        quizzes[quizIndex] = quiz;
    } else {
        quizzes.push(quiz);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

export function deleteQuiz(id: string) {
    const quizzes = getQuizzes().filter((quiz) => quiz.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

export function seedQuizzes() {
    const initialized = localStorage.getItem(STORAGE_KEY + ".init");
    if (initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exampleQuizzes));
    localStorage.setItem(STORAGE_KEY + ".init", "true");
}