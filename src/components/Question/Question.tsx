import React, { CSSProperties, useRef, useState, useEffect } from 'react'
import { QuestionType } from '../../api/types'
import { convertToDate } from '../../common/date/date'
import styles from './Question.module.css'

type PropsType = {
    question: QuestionType
}

const truncate = (str: any, n: number) => {
    if (str)
        return str.length > n ? str.substr(0, n - 1) + '...' : str
}

export const Question: React.FC<PropsType> = ({ question }) => {
    const {
        score,
        title,
        is_answered,
        view_count,
        creation_date,
        last_activity_date,
        owner
    } = question


    const [scoreLocal, setScoreLocal] = useState(score)
    const [scoreUpDown, setScoreUpDown] = useState(0)

    const [dropDown, setDropDown] = useState(false)
    const ref = useRef<HTMLDivElement>(null);



    useEffect(() => {

        const closeDropdown = (e: any) => {
            if (e.path[0] !== ref.current) {
                setDropDown(false);

            };
        }
        document.body.addEventListener('click', closeDropdown);

        return () => document.body.removeEventListener('click', closeDropdown);
    }, []);


    const openCloseDropDown = () => {
        setDropDown(prev => !prev)
    }

    const onClickUpHandler = () => {
        if (scoreUpDown < 1) {
            setScoreLocal(scoreLocal + 1)
            setScoreUpDown(scoreUpDown + 1)
        }
    }

    const onClickDownHandler = () => {
        if (scoreUpDown > -1) {
            setScoreLocal(scoreLocal - 1)
            setScoreUpDown(scoreUpDown - 1)
        }
    }

    return (
        <div>
            <div className={styles.questionBlock} style={is_answered ? isAnswered : isNotAnswered} >
                <div ref={ref} onClick={openCloseDropDown} className={styles.items}>
                    {truncate(title, 90)}
                    <span>
                        {scoreLocal}
                    </span>
                </div>
                <span className={styles.scoreButton}>
                    <i
                        onClick={onClickUpHandler}
                        className="fa fa-arrow-up"
                        aria-hidden="true">
                    </i>
                    <i
                        onClick={onClickDownHandler}
                        className="fa fa-arrow-down"
                        aria-hidden="true">
                    </i>
                </span>
            </div>
            {
                dropDown && <div className={styles.dropDownBlock}>
                    <div> Название вопроса: <b> {title} </b></div>
                    <div> Имя создателя вопроса: <b> {owner.display_name} </b></div>
                    <div> Рейтинг создателя вопроса: <b> {owner.reputation} </b></div>
                    <div> количество просмотров вопроса: <b> {view_count} </b></div>
                    <div> дата последней активности: <b> {convertToDate(last_activity_date)}</b></div>
                    <div> дата создания вопроса: <b> {convertToDate(creation_date)} </b></div>
                    {/* <div> accept_rate: <b> {owner.accept_rate ? owner.accept_rate : '---'} </b></div> */}
                </div>
            }
        </div>
    )
}


const isAnswered: CSSProperties = {
    // backgroundImage: 'linear-gradient(to right, #46ab46 0%, #76ce76 51%, #46ab46 100%)',
    backgroundImage: 'linear-gradient(to right top, #81FBB8, #28C76F)',
    backgroundSize: '200% auto',
    transition: '.6s'
}

const isNotAnswered = {}