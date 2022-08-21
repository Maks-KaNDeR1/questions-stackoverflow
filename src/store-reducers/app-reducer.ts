

let initialState = {
    statusLoading: false,
    error: '',
    errorCode: 0
};

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, statusLoading: action.status }
        case 'APP/ERROR_MESSAGE':
            return { ...state, error: action.error }
        case 'APP/ERROR_CODE':
            return { ...state, errorCode: action.code }
        default:
            return state;
    }
}


export const setStatus = (status: boolean) => ({ type: 'APP/SET-STATUS', status } as const)
export const errorMessage = (error: string) => ({ type: 'APP/ERROR_MESSAGE', error } as const)
export const errorCode = (code: number) => ({ type: 'APP/ERROR_CODE', code } as const)


export type AppActionsType =
    | ReturnType<typeof setStatus>
    | ReturnType<typeof errorMessage>
    | ReturnType<typeof errorCode>

export default appReducer;