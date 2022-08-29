import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import './Header.scss'

type PropsType = {
    title: string
    searchValue: string
    dateValue: string
    currentPage: number
    pageSize: number
    searchClickHandler: () => void
    setSearchValue: (title: string) => void
    setDateValue: (title: string) => void
}

export const Header: React.FC<PropsType> = React.memo((
    {
        title,
        searchValue,
        dateValue,
        currentPage,
        pageSize,
        searchClickHandler,
        setSearchValue,
        setDateValue
    }
) => {

    const [openCLoseButton, setOpenCLoseButton] = useState(false)


    const dateChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.currentTarget.value)
        if (e) setOpenCLoseButton(true)
    }, [setDateValue])

    const searchValueChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
        if (e) setOpenCLoseButton(true)
    }, [setSearchValue])

    const onCLickHandler = () => {
        setOpenCLoseButton(false)
        searchClickHandler()
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onCLickHandler();
        }
    }


    return (
        <span className={'titleBlock'}>
            <b>{currentPage * pageSize}</b> самых популярных вопросов на  Stackoverflow, содержащих "{title}"
            в наименовании, начиная  с
            <input
                className={'dateInput'}
                type="date"
                value={dateValue}
                onChange={dateChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <div className={'LowerLevel'} >
                <input
                    placeholder='new title...'
                    className={'searchInput'}
                    value={searchValue}
                    onChange={searchValueChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                {
                    openCLoseButton && <button
                        className={'buttonSearch'}
                        onClick={onCLickHandler}
                    >
                        поиск
                    </button>
                }
            </div>
        </span>
    )
})
