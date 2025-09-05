export type QuizBlock = {
    id: string
    type: 'header' | 'question' | 'button' | 'footer'
    props: Record<string, any>
}

export type Quiz = {
    id: string
    title: string
    blocks: QuizBlock[]
    published: boolean
    createdAt: string
    updatedAt: string
}