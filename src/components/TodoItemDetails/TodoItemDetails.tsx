import React from 'react';
import styles from "../TodoItem/TodosItem.module.scss";

type TodoItemDetailsType = {
    completed: boolean,
    id: number
    header: string,
    description: string
}

const TodoItemDetails: React.FC<TodoItemDetailsType> = (props) => {
    return (
        <details className={`${styles.item__body} ${props.completed ? styles.item__completed : ''}`}>
            <summary className={styles.item__header}>
                <div>
                    <p>{props.id + 1 + '. ' + props.header}</p>
                </div>
                <span className={styles.item__indicator}></span>
            </summary>
            <div className={styles.item__description}>
                <p>{props.description}</p>
            </div>
        </details>
    );
};

export default TodoItemDetails;