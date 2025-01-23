export type IdType = number
export type ShownTodosCriterion = 'all' | 'inProgress' | 'completed'

export type TodoItemType = {
    id: IdType,
    header: string,
    description: string,
    completed: boolean
}

export type TodosSliceType = {
    todos: Array<TodoItemType>,
    todosCount: number,
    pageSize: number,
    currentPage: number,
    todosCriterion: ShownTodosCriterion,
    addingTodo: boolean,
    todosToBeRemoved: Array<number>
}

export type GetTodosType = string
export type GetTodosResponseType = {
    todos: TodoItemType[],
    todosCount: number
}

export type AddTodoType = {
    header: string,
    description: string
}
export type AddTodoResponseType = {
    todo: TodoItemType,
    todosCount: number
}

export type CompleteTodoType = IdType
export type CompleteTodoResponseType = {
    id: IdType,
    completed: boolean
}

export type RemoveTodoType = IdType
export type RemoveTodoResponseType = {
    todos: TodoItemType[],
    todosCount: number
}

