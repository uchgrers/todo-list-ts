import axios from "axios";

export const baseRequestParams = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const todosUrl = 'todos'