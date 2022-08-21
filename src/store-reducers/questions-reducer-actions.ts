import { QuestionType } from "../api/types"


export const setQuestions = (questions: QuestionType[]) => ({ type: 'QUESTIONS/SET_QUESTION', questions } as const)

export const addQuestions = (questions: QuestionType[]) => ({ type: 'QUESTIONS/ADD_QUESTION', questions } as const)

export const setCurrentPage = (currentPage: number) => ({ type: 'QUESTIONS/SET_CURRENT_PAGE', currentPage } as const)

export const setPageSize = (pageSize: number) => ({ type: 'QUESTIONS/SET_PAGE_SIZE', pageSize } as const)

export const setTitle = (title: string) => ({ type: 'QUESTIONS/SET_TITLE', title } as const)

export const setDate = (date: number) => ({ type: 'QUESTIONS/SET_DATE', date } as const)



export type QuestionsActionsType =
    | ReturnType<typeof setQuestions>
    | ReturnType<typeof addQuestions>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPageSize>
    | ReturnType<typeof setTitle>
    | ReturnType<typeof setDate>