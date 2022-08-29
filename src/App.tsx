import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './utils/hook';
import { LinearProgress } from '@mui/material';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import DragDrop from './components/DragDrop/DragDrop';
import { convertToDate, convertToTimestamp } from './common/date/date';
import { loadMoreQuestions, requestQuestions } from './store-reducers/questions-reducer-thunks';



function App() {

  const { questions, pageSize, currentPage, title, date } = useAppSelector(state => state.question)
  const loading = useAppSelector(state => state.app.statusLoading)
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState(title)
  const [dateValue, setDateValue] = useState<string>(convertToDate(date))
  const [page, setPageSize] = useState(pageSize)

  const fromdate = convertToTimestamp(dateValue)

  useEffect(() => {
    dispatch(requestQuestions(fromdate, 1, page, searchValue))
  }, [page])

  const onPageChanged = useCallback(() => {
    const enlargedCurrentPage = currentPage + 1
    dispatch(loadMoreQuestions(fromdate, enlargedCurrentPage, page, searchValue))
  }, [currentPage, dispatch, fromdate, page, searchValue])

  const searchClickHandler = useCallback(() => {
    dispatch(requestQuestions(fromdate, 1, page, searchValue))
  }, [dispatch, fromdate, page, searchValue])


  return (
    <div className="app">
      {loading && <LinearProgress sx={linearStyle} />}
      <div className="app-wrapper">
        <Header
          title={title}
          searchValue={searchValue}
          dateValue={dateValue}
          setDateValue={setDateValue}
          currentPage={currentPage}
          pageSize={page}
          searchClickHandler={searchClickHandler}
          setSearchValue={setSearchValue}
        />
        <div className='partition'></div>
        <div className='question'>
          {
            questions.length < 1
              ? <h1>По данному запросу вопросов не найдено</h1>
              : <DragDrop questions={questions} />
          }
        </div >
        <div>
          <Footer
            questions={questions}
            loading={loading}
            onPageChanged={onPageChanged}
            setPageSize={setPageSize}
          />
        </div>
      </div>
      <ErrorSnackbar />
    </div>
  )
}


const linearStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1vh',
  width: '99%',
  height: '5px'
}

export default App;
