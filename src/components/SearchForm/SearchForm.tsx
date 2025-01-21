import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../redux/hooks";
import {getTodos} from "../../redux/todosSlice";
import styles from './SearchForm.module.scss';

const SearchForm = () => {

    const [text, setText] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            dispatch(getTodos({searchParams: text}))
        }, 300)

        return () => {
            clearTimeout(searchTimeout)
        }
    }, [text])

    return (
        <>
            {
                <form className={styles.form}>
                    <input type="search"
                           placeholder="Search"
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                    />
                </form>
            }
        </>
    );
};

export default SearchForm;