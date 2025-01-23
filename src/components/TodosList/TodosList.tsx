import React, {useEffect, useMemo} from 'react';
import styles from './TodosList.module.scss';
import {useAppDispatch, useAppSelector, useTodosSelector} from "../../redux/hooks";
import TodoItem from "./../TodoItem/TodoItem";
import {setTodosCount} from "../../redux/todosSlice";
import Preloader from "../common/Preloader/Preloader";

const TodosList = () => {
    const dispatch = useAppDispatch()
    const pageSize = useAppSelector(state => state.todosReducer.pageSize)
    const currentPage = useAppSelector(state => state.todosReducer.currentPage)
    const criterion = useAppSelector(state => state.todosReducer.todosCriterion)
    const addingTodo = useAppSelector(state => state.todosReducer.addingTodo)

    const filteredTasks = useTodosSelector({currentPage, pageSize, criterion})
    const todos = filteredTasks.tasks

    const todosComponents = useMemo(() => {
        return todos
            ?.map((todo) => <TodoItem id={todo.id}
                                      header={todo.header}
                                      description={todo.description}
                                      key={todo.id}
                                      completed={todo.completed}
            />)
    }, [todos])

    useEffect(() => {
        dispatch(setTodosCount(filteredTasks.tasksCount))
    }, [todosComponents.length])

    return (
        <ul className={styles.list}>
            {todosComponents}
            {addingTodo && <Preloader/>}
        </ul>
    );
};

export default TodosList;