import React, {useEffect, useState} from 'react';
import styles from './TodosItem.module.scss';
import {TodoItemType} from "../../types";
import {useAppDispatch} from "../../redux/hooks";
import {editTodo} from "../../redux/todosSlice";
import TodoForm from "../TodoForm/TodoForm";
import TodoControl from "../TodoControl/TodoControl";
import TodoItemDetails from "../TodoItemDetails/TodoItemDetails";

const TodosItem: React.FC<TodoItemType> = (props) => {
    const [text, setText] = useState({
        header: '',
        description: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setText({
            header: props.header,
            description: props.description
        })
    }, [props.header, props.description])

    const editTask = (e: any) => {
        if (text.header.trim()) {
            dispatch(editTodo({
                id: props.id,
                header: text.header,
                description: text.description,
                completed: props.completed
            }))
            setIsEditing(false)
        }
        e.preventDefault()
    }

    const cancel = () => {
        setIsEditing(false)
        setText({
            header: props.header,
            description: props.description
        })
    }

    return (
        <li className={styles.item}>
            <TodoItemDetails completed={props.completed}
                             id={props.id}
                             header={props.header}
                             description={props.description}/>
            <TodoControl
                setIsEditing={setIsEditing}
                id={props.id}
            />
            {isEditing && <TodoForm type='edit'
                                    onSubmit={editTask}
                                    cancel={cancel}
                                    setText={setText}
                                    openForm={isEditing}
                                    text={text}
            />}
        </li>
    );
};

export default TodosItem;