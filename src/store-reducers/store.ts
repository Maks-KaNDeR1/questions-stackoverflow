import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import appReducer, { AppActionsType } from './app-reducer';
import questionsReducer from './questions-reducer';
import { QuestionsActionsType } from './questions-reducer-actions';

export const rootReducer = combineReducers({
    app: appReducer,
    question: questionsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionType = AppActionsType | QuestionsActionsType

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionType>

// @ts-ignore
window.store = store
