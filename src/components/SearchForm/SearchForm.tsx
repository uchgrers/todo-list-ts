import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../redux/hooks";
import {getTodos} from "../../redux/todosSlice";
import styles from './SearchForm.module.scss';

const SearchForm = () => {

    const dispatch = useAppDispatch()

    const [text, setText] = useState('')
    const [isInputTouched, setIsInputTouched] = useState(false)

    useEffect(() => {
        let searchTimeout: string | number | NodeJS.Timeout | undefined
        if (isInputTouched) {
            searchTimeout = setTimeout(() => {
                dispatch(getTodos({searchParams: text}))
            }, 300)
        }

        return () => {
            clearTimeout(searchTimeout)
        }
    }, [text])

    return (
        <form className={styles.form}>
            <input type="search"
                   placeholder="Search"
                   value={text}
                   onChange={(e) => {
                       setIsInputTouched(true)
                       return setText(e.target.value)
                   }}
            />
        </form>
    );
};

export default SearchForm;