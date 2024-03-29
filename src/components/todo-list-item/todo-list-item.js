import React from 'react';

import './todo-list-item.css';

const TodoListItem = (props) => {

    const { label, onDeleted, done, important, onToggleDone, onToggleImportant } = props;

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    const trashCanSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"
             viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0
                1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1
                1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0
                1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
    );

    const exclamationSGV = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-exclamation-lg" viewBox="0 0 16 16">
            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
        </svg>
    );

    return (
        <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ onToggleDone }>
                    {label}
                </span>
                <span className="handling-button-box">
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={ onDeleted }>
                        {trashCanSVG}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={ onToggleImportant }>
                        {exclamationSGV}
                    </button>
                </span>
            </span>
    );

}

export default TodoListItem;
