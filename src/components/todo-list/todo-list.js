import React from 'react';

import TodoListItem from "../todo-list-item";

import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

    const todoItems = todos.map(
        (item) => {

            const {id, ...itemProps} = item;

            return (
                 <li className="list-group-item" key={id}>
                     <TodoListItem
                         onDeleted={ () => onDeleted(id) }
                         onToggleImportant={ () => onToggleImportant(id) }
                         onToggleDone={ () => onToggleDone(id) }
                         {...itemProps}
                     />
                 </li>
             );
        }
    );

    return (
        <ul className="list-group mb-3 todo-list">
            {todoItems}
        </ul>
    );
}

export default TodoList;