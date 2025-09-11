export enum BlockTypeEnum {
  HEADER = "header",
  FOOTER = "footer",
  BUTTON = "button",
  QUESTION = "question",
}

export type TQuizBlock = {
    id: string
    type: BlockTypeEnum
    props: Record<string, any>
}

export type TQuiz = {
    id: string
    title: string
    blocks: TQuizBlock[]
    published: boolean
    createdAt: string
    updatedAt: string
}
