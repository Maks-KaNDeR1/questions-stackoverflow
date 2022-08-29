import { Dispatch } from "redux";
import { questionAPI } from "../api/api";
import { addQuestions, setCurrentPage, setDate, setPageSize, setQuestions, setTitle } from "./questions-reducer-actions";
import { setStatus, errorMessage, errorCode } from "./app-reducer";
import { AppThunkType } from "./store";



export const getQuestions = async (
    dispatch: Dispatch,
    actionCreator: Function,
    fromdate: number,
    currentPage: number,
    pageSize: number,
    title: string,

) => {

    dispatch(setStatus(true))
    try {
        const res = await questionAPI.getQuestion(fromdate, currentPage, pageSize, title)

        dispatch(actionCreator(res.data.items));
        dispatch(setCurrentPage(currentPage))
        dispatch(setPageSize(pageSize))
        dispatch(setTitle(title))
        dispatch(setDate(fromdate))
    }
    catch (err: any) {
        dispatch(errorMessage(err.response.data.error_name))
        dispatch(errorCode(err.response.data.error_id))
    }
    finally {
        dispatch(setStatus(false))
    }
}

export const requestQuestions =
    (fromdate: number, currentPage: number, pageSize: number, title: string): AppThunkType =>
        async (dispatch) => {
            getQuestions(dispatch, setQuestions, fromdate, currentPage, pageSize, title)
        }

export const loadMoreQuestions =
    (fromdate: number, currentPage: number, pageSize: number, title: string): AppThunkType =>
        async (dispatch) => {
            getQuestions(dispatch, addQuestions, fromdate, currentPage, pageSize, title)
        }
