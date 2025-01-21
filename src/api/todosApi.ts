import {
    AddTodoResponseType, AddTodoType,
    CompleteTodoResponseType, CompleteTodoType,
    GetTodosResponseType,
    GetTodosType, RemoveTodoResponseType, RemoveTodoType,
    TodoItemType
} from "../types";
import {baseRequestParams, todosUrl} from "./apiConfig";

export const todosAPI = {
    fetchTodos(searchParams: GetTodosType): Promise<GetTodosResponseType> {
        return baseRequestParams.get(`${todosUrl}?searchParams=${searchParams}`)
            .then(response => response.data)
    },
    addTodo(todoData: AddTodoType): Promise<AddTodoResponseType> {
        return baseRequestParams.post(todosUrl, todoData)
            .then(response => response.data.data)
    },
    removeTodo(id: RemoveTodoType): Promise<RemoveTodoResponseType> {
        return baseRequestParams.put(todosUrl, {id, type: 'remove'})
            .then(response => response.data.data)
    },
    editTodo(todoData: TodoItemType): Promise<TodoItemType> {
        return baseRequestParams.put(todosUrl, {...todoData, type: 'edit'})
            .then(response => response.data.data)
    },
    completeTodo(id: CompleteTodoType): Promise<CompleteTodoResponseType> {
        return baseRequestParams.put(todosUrl, {id, type: 'complete'})
            .then(response => response.data.data)
    }
}