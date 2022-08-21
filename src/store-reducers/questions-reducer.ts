import { QuestionType } from "../api/types";
import { QuestionsActionsType } from "./questions-reducer-actions";


let initialState = {
    questions: [] as QuestionType[],
    currentPage: 1,
    pageSize: 5,
    title: 'react-redux',
    date: 1514764800
};

export type InitialStateType = typeof initialState


const questionsReducer = (state = initialState, action: QuestionsActionsType): InitialStateType => {
    switch (action.type) {
        case 'QUESTIONS/SET_QUESTION':
            return { ...state, questions: action.questions }
        case 'QUESTIONS/ADD_QUESTION':
            return { ...state, questions: [...state.questions, ...action.questions] }
        case 'QUESTIONS/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'QUESTIONS/SET_PAGE_SIZE':
            return { ...state, pageSize: action.pageSize }
        case 'QUESTIONS/SET_TITLE':
            return { ...state, title: action.title }
        case 'QUESTIONS/SET_DATE':
            return { ...state, date: action.date }
        default:
            return state;
    }
}



export default questionsReducer;