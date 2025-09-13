export type HeaderFooterButtonProps = { text: string };

export enum BlockTypeEnum {
  HEADER = "header",
  FOOTER = "footer",
  BUTTON = "button",
  QUESTION = "question",
}

export type TQuestionProps = {
  question: string;
  options: string[];
  type: "single" | "multi";
};

export type TQuizBlock =
  | { id: string; type: BlockTypeEnum.HEADER; props: HeaderFooterButtonProps }
  | { id: string; type: BlockTypeEnum.FOOTER; props: HeaderFooterButtonProps }
  | { id: string; type: BlockTypeEnum.BUTTON; props: HeaderFooterButtonProps }
  | { id: string; type: BlockTypeEnum.QUESTION; props: TQuestionProps };

export type TQuiz = {
  id: string;
  title: string;
  blocks: TQuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
export const STORAGE_KEY = 'quizbuilder.quizzes'

export const exampleQuizzes: TQuiz[] = [
        {
            id: crypto.randomUUID(),
            title: "Quiz 1",
            blocks: [
                { id: crypto.randomUUID(), type: BlockTypeEnum.HEADER, props: { text: "U ready?!" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.QUESTION, props: { question: "How many times did Brazil national soccer team win world cup?", options: ['3', '4', '5'], type: "single" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.BUTTON, props: { text: "Next!" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.FOOTER, props: { text: "Good luck!" } },
            ],
            published: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: crypto.randomUUID(),
            title: "Quiz 2",
            blocks: [
                { id: crypto.randomUUID(), type: BlockTypeEnum.HEADER, props: { text: "Let's Start!" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.QUESTION, props: { question: "Europian country?", options: ['Belarus', 'Brazil', 'France'], type: "multi" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.BUTTON, props: { text: "Submit!" } },
                { id: crypto.randomUUID(), type: BlockTypeEnum.FOOTER, props: { text: "Hope u did great!" } },
            ],
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];