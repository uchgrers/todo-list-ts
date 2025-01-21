import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {ShownTodosCriterion, TodoItemType} from "../types";
import {useEffect, useMemo} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type UseItemsSelectorArgs = {
    currentPage: number,
    pageSize: number,
    criterion: ShownTodosCriterion
}

export const useTodosSelector = ({currentPage, pageSize, criterion}: UseItemsSelectorArgs): { tasks: TodoItemType[], tasksCount: number } => {

    const tasks = useAppSelector(state => state.todosReducer.todos)

    return useMemo(() => {
        if (!tasks) {
            return {tasks: [], tasksCount: 0}
        }

        let filteredTasks: TodoItemType[] = []

        switch (criterion) {
            case 'all':
                filteredTasks = tasks
                break
            case 'inProgress':
                filteredTasks = tasks.filter(todo => !todo.completed)
                break
            case 'completed':
                filteredTasks = tasks.filter(todo => todo.completed)
                break
            default:
                filteredTasks = tasks
        }

        return {
            tasks: filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize),
            tasksCount: filteredTasks.length
        }
    }, [tasks, currentPage, pageSize, criterion])

}

export const useEscapeModalCloser = (cancel: (() => void) | undefined) => {
    useEffect(() => {
        const escapeHandler = (event: KeyboardEvent) => {
            if (event.key === "Escape" && cancel) {
                cancel()
            }
        }
        window.addEventListener("keydown", escapeHandler)

        return () => {
            window.removeEventListener("keydown", escapeHandler)
        }
    }, [cancel])
}