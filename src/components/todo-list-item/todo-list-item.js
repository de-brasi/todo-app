import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({label, important = false}) => {

    const style = {
        color: important ? 'steelblue' : 'black',
        fontWeight: important ? 'bold' : 'normal'
    };
    return (
        <span className="todo-list-item">
            <span
                className="todo-list-item-label"
                style={style}>
                {label}
            </span>
            <span className="handling-button-box">
                <button
                    type={"button"}
                    className="btn btn-outline-success btn-sm">
                    <i className="fa-solid fa-exclamation"/>
                </button>
                <button
                    type={"button"}
                    className="btn btn-outline-danger btn-sm">
                    <i className="fa-solid fa-trash"/>
                </button>
                {/*TODO: delete*/}
                {/*<i className="fa-solid fa-exclamation"/>*/}
                {/*<i className="fa-solid fa-trash"/>*/}
            </span>
        </span>
    );
};

export default TodoListItem;