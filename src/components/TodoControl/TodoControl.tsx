import React, {useState} from 'react';
import {useAppDispatch} from "../../redux/hooks";
import {completeTodo, removeTodo} from "../../redux/todosSlice";
import styles from './TodoControl.module.scss';
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

type TodoControlType = {
    setIsEditing: (isEditing: boolean) => void,
    id: number
}

const TodoControl: React.FC<TodoControlType> = (props) => {

    const [confirmDelete, setConfirmDelete] = useState(false)

    const dispatch = useAppDispatch()

    const completeTask = () => {
        dispatch(completeTodo(props.id))
    }
    const deleteTask = () => {
        dispatch(removeTodo(props.id))
        setConfirmDelete(false)
    }
    const editTask = () => {
        props.setIsEditing(true)
    }

    return (
        <div className={styles.control}>
            <ConfirmDeleteModal deleteTask={deleteTask}
                                confirmDelete={confirmDelete}
                                setConfirmDelete={setConfirmDelete}
            />
            <div className={styles.control__item} onClick={editTask}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
            </div>
            <div className={styles.control__item} onClick={completeTask}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
            </div>
            <div className={styles.control__item} onClick={() => setConfirmDelete(true)}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
            </div>
        </div>
    );
};

export default TodoControl;