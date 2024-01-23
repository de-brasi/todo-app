import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import React from "react";

import './app.css';

const App = () => {

    const todoData = [
        {label: 'Какая-то задача', important: false, id: 1},
        {label: 'И еще задача', important: false, id: 2},
        {label: 'И еще', important: true, id: 3}
    ];

    return (
        <div className={"app"}>
            <AppHeader/>
            <div className={"input-group mb-3"}>
                <span><SearchPanel/></span>
                <span><ItemStatusFilter/></span>
            </div>
            <TodoList todos={todoData}/>
        </div>
    );
};

export default App;