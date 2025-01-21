import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://todo-list-ts-production.up.railway.app/"
        : "http://localhost:8000/"

export const baseRequestParams = axios.create({
    withCredentials: true,
    baseURL
})

export const todosUrl = 'todos'