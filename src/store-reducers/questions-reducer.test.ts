import { QuestionType } from '../api/types';
import questionsReducer, { InitialStateType } from './questions-reducer'
import { addQuestions, setCurrentPage, setPageSize, setTitle } from './questions-reducer-actions';

let state: InitialStateType;

beforeEach(() => {
    state = {
        questions: [],
        currentPage: 1,
        pageSize: 5,
        title: 'react-redux',
        date: 1514764800
    }
})

test('title should be correct', () => {
    const newState = questionsReducer(state, setTitle('redux'))

    expect(newState.title).toBe('redux');
})


test('page Size should be correct', () => {
    const newState = questionsReducer(state, setPageSize(10))

    expect(newState.pageSize).toBe(10);
})
test('current page should be correct', () => {
    const newState = questionsReducer(state, setCurrentPage(2))

    expect(newState.currentPage).toBe(2);
})

