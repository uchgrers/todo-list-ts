import React from 'react';
import styles from './Toggle.module.scss';

type ToggleType = {
    setKeepFormOpen: (keepFormOpen: boolean) => void,
    keepFormOpen: boolean,
}

const Toggle: React.FC<ToggleType> = (props) => {

    const onToggle = () => {
        props.setKeepFormOpen(!props.keepFormOpen)
    }

    return (
        <div className={styles.wrapper}>
            <span>Keep adding form open</span>
            <label className={styles.wrapper__toggle}>
                <input className={styles.wrapper__toggle_input}
                       onChange={onToggle}
                       checked={props.keepFormOpen}
                       type="checkbox"
                />
                <span className={styles.wrapper__toggle_slider}></span>
            </label>
        </div>
    );
};

export default Toggle;