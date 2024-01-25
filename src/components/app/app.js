import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css';

export default class App extends Component {
    render() {
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
                <TodoList
                    todos={todoData}
                    onDeleted={ (id) => {console.log('del', id)} }/>
            </div>
        );
    }
}
