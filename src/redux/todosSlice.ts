import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    IdType,
    TodoItemType,
    TodosSliceType,
    AddTodoResponseType,
    CompleteTodoResponseType,
    GetTodosResponseType,
    RemoveTodoResponseType, AddTodoType,
} from "../types";
import {
    todosAPI
} from "../api/todosApi";

export const initialState: TodosSliceType = {
    todos: [],
    todosCount: 0,
    pageSize: 5,
    currentPage: 1,
    todosCriterion: 'all',
    addingTodo: false,
    todosToBeRemoved: []
}

export const getTodos = createAsyncThunk<GetTodosResponseType, { searchParams: string }>(
    'todos/getTodos',
    async function ({searchParams}) {
        return await todosAPI.fetchTodos(searchParams)
    }
)

export const addTodo = createAsyncThunk<AddTodoResponseType, AddTodoType>(
    'todos/addTodo',
    async function ({header, description}) {
        return await todosAPI.addTodo({header, description})
    }
)

export const completeTodo = createAsyncThunk<CompleteTodoResponseType, IdType>(
    'todos/completeTodo',
    async function (id) {
        return await todosAPI.completeTodo(id)
    }
)

export const removeTodo = createAsyncThunk<RemoveTodoResponseType, IdType>(
    'todos/removeTodo',
    async function (id, {dispatch}) {
        dispatch(setTodoToRemoval(id))
        const result = await todosAPI.removeTodo(id)
        dispatch(removeTodoIdFromRemovingList(id))
        return result
    }
)

export const editTodo = createAsyncThunk<TodoItemType, TodoItemType>(
    'todos/editTodo',
    async function (todoData) {
        return await todosAPI.editTodo(todoData)
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodosCount(state, action) {
            state.todosCount = action.payload
        },
        changeCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        changePageSize(state, action) {
            state.pageSize = action.payload
            if (state.currentPage > Math.ceil(state.todosCount / state.pageSize)) {
                state.currentPage = Math.ceil(state.todosCount / state.pageSize)
            }
        },
        changeCriterion(state, action) {
            state.todosCriterion = action.payload
            if (state.currentPage > Math.ceil(state.todosCount / state.pageSize) && Math.ceil(state.todosCount / state.pageSize) > 0) {
                state.currentPage = Math.ceil(state.todosCount / state.pageSize)
            }
        },
        setTodoToRemoval(state, action) {
            state.todosToBeRemoved.push(action.payload)
        },
        removeTodoIdFromRemovingList(state, action) {
            state.todosToBeRemoved = state.todosToBeRemoved.filter(todoId => todoId !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(addTodo.pending, (state, action) => {
            state.addingTodo = true
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload.todo)
            state.addingTodo = false
            state.todosCount = action.payload.todosCount
            if (Math.ceil(state.todosCount / state.pageSize) > 0) {
                state.currentPage = Math.ceil(state.todosCount / state.pageSize)
            }
        })
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.todos = action.payload.todos
            state.todosCount = action.payload.todosCount
        })
        builder.addCase(completeTodo.fulfilled, (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.completed = action.payload.completed
            }
        })
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            state.todos = action.payload.todos
            state.todosCount = action.payload.todosCount
        })
        builder.addCase(editTodo.fulfilled, (state, action) => {
            state.todos[action.payload.id].header = action.payload.header
            state.todos[action.payload.id].description = action.payload.description
        })
    }
})

export const {
    changeCurrentPage,
    changePageSize,
    changeCriterion,
    setTodosCount,
    setTodoToRemoval,
    removeTodoIdFromRemovingList
} = todosSlice.actions

export default todosSlice.reducer