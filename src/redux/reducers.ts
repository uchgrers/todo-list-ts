import {combineReducers} from "redux";
import todosSlice from "./todosSlice";

export const rootReducer = combineReducers({
    todosReducer: todosSlice
})