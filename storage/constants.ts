import { Quiz } from "./types"

export const STORAGE_KEY = 'quizbuilder.quizzes'

export const exampleQuizzes: Quiz[] = [
        {
            id: crypto.randomUUID(),
            title: "Quiz 1",
            blocks: [
                { id: crypto.randomUUID(), type: "header", props: { text: "U ready?!" } },
                { id: crypto.randomUUID(), type: "question", props: { question: "How many times did Brazil national soccer team win world cup?", options: [3, 4, 5], type: "single" } },
                { id: crypto.randomUUID(), type: "button", props: { text: "Next!" } },
                { id: crypto.randomUUID(), type: "footer", props: { text: "Good luck!" } },
            ],
            published: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: crypto.randomUUID(),
            title: "Quiz 2",
            blocks: [
                { id: crypto.randomUUID(), type: "header", props: { text: "Let's Start!" } },
                { id: crypto.randomUUID(), type: "question", props: { question: "Europian country?", options: ['Belarus', 'Brazil', 'France'], type: "multi" } },
                { id: crypto.randomUUID(), type: "button", props: { text: "Submit!" } },
                { id: crypto.randomUUID(), type: "footer", props: { text: "Hope u did great!" } },
            ],
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];