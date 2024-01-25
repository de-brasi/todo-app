import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css';

const App = () => {

    const todoData = [
        {label: 'Какая-то задача', important: false, id: 1},
        {label: 'И еще задача', important: false, id: 2},
        {label: 'И еще', important: true, id: 3}
    ];

    return (
        <div className="app">
            <AppHeader toDo={1} done={3} />
            <span className="input-group mb-3 d-flex">
                <span><SearchPanel/></span>
                <span><ItemStatusFilter/></span>
            </span>
            <TodoList todos={todoData}/>
        </div>
    );
};

export default App;