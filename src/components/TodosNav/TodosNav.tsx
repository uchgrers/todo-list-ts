import React, {useState} from 'react';
import './../../styles/_utils.scss';
import styles from './TodosNav.module.scss';
import Toggle from "../common/Toggle/Toggle";
import SearchForm from "../SearchForm/SearchForm";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeCriterion} from "../../redux/todosSlice";

type TodosNavType = {
    setOpenForm: (addingNewTask: boolean) => void,
    setKeepFormOpen: (keepFormOpen: boolean) => void,
    keepFormOpen: boolean
}

const TodosNav: React.FC<TodosNavType> = (props) => {

    const [isShown, setIsShown] = useState(false)

    const criterion = useAppSelector(state => state.todosReducer.todosCriterion)

    const dispatch = useAppDispatch()

    const onCriterionChange = (e: React.FormEvent<HTMLSelectElement>) => {
        dispatch(changeCriterion(e.currentTarget.value))
    }

    return (
        <div className={styles.container}>
            <button onClick={() => setIsShown(!isShown)}
                    className={`${styles.container__openNavButton} visibleMobile`}
                >
                {isShown ? 'Hide navigation' : 'Show navigation'}
            </button>
            <nav className={
                `${styles.nav} ${isShown ? "" : "hiddenMobile"}`
            }>
                <div className={styles.nav__buttons}>
                    <Toggle keepFormOpen={props.keepFormOpen} setKeepFormOpen={props.setKeepFormOpen}/>
                    <div className={styles.nav__selector}>
                        <label htmlFor="tasksSelector">Show</label>
                        <select onChange={onCriterionChange}
                                name="tasksSelector"
                                id="tasksSelector"
                                value={criterion}
                        >
                            <option value="all">All</option>
                            <option value="inProgress">In progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <SearchForm/>
                <button onClick={() => props.setOpenForm(true)}>Create new task</button>
            </nav>
        </div>
    );
};

export default TodosNav;