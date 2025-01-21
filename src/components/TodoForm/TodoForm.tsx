import React from 'react';
import styles from './TodoForm.module.scss';
import Overlay from "../common/Overlay/Overlay";
import {useEscapeModalCloser} from "../../redux/hooks";

type TodoFormType = {
    type: 'add' | 'edit',
    text: {
        header: string,
        description: string
    },
    onSubmit: (e: React.FormEvent) => void,
    cancel?: () => void,
    cancelEditing?: () => void,
    cancelAdding?: (addingNewTask: boolean) => void,
    setText: (text: {
        header: string,
        description: string
    }) => void,
    openForm: boolean
}

const TodoForm: React.FC<TodoFormType> = (props) => {

    useEscapeModalCloser(props.cancel)

    return (
        <>
            {props.openForm &&
                <>
                    <Overlay/>
                    <form className={styles.form}>
                        <div className={styles.form__field}>
                            <label className={styles.form__input_label} htmlFor="title">
                                Title*
                            </label>
                            <input id="title"
                                   type="text"
                                   value={props.text.header}
                                   placeholder="Title"
                                   onChange={(e) => props.setText({
                                       header: e.target.value,
                                       description: props.text.description
                                   })}/>
                        </div>
                        <div className={styles.form__field}>
                            <label className={styles.form__input_label} htmlFor="description">Description</label>
                            <textarea id="description"
                                      value={props.text.description}
                                      placeholder="Description"
                                      onChange={(e) => props.setText({
                                          header: props.text.header,
                                          description: e.target.value
                                      })}
                            />
                        </div>
                        <button onClick={props.onSubmit}>
                            {props.type === 'add' ? 'Add todo' : 'Edit todo'}
                        </button>
                        <button onClick={props.cancel}>Cancel</button>
                    </form>
                </>
            }
        </>
    );
};

export default TodoForm;