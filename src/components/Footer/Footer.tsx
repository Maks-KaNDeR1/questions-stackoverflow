import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './Footer.module.css'
import { QuestionType } from '../../api/types';


type PropsType = {
    questions: QuestionType[]
    loading: any
    onPageChanged: () => void
    setPageSize: (value: number) => void
}

export const Footer: React.FC<PropsType> = ({ questions, loading, onPageChanged, setPageSize }) => {

    const [age, setAge] = useState('5');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value)
        setPageSize(Number(event.target.value))
    };

    return (
        <footer className={styles.footer}>

            {
                questions.length > 4 ?
                    <div className={styles.footerBlock}>
                        <div>
                            <FormControl className={styles.formControl} >
                                <Select
                                    className={styles.select}
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="5">
                                        <em>5</em>
                                    </MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>15</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <button className={styles.buttonLoad} onClick={onPageChanged}>
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ margin: "0 10px 0 0", fontSize: "18px" }}
                                    />
                                )}load more</button>
                        </div>
                    </div> : <></>
            }
        </footer>

    )
}
