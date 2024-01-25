import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItem from "../add-item";

import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            {label: 'Какая-то задача', important: false, id: 1},
            {label: 'И еще задача', important: false, id: 2},
            {label: 'И еще', important: true, id: 3}
        ]
    };

    deleteItem = (id) => {
        this.setState(
            (state) => {
                const erasedElementIndex = state.todoData.findIndex((el) => el.id === id);

                const before = state.todoData.slice(0, erasedElementIndex);
                const after = state.todoData.slice(erasedElementIndex + 1);
                const updatedTodos = [...before, ...after];

                return {
                    todoData: updatedTodos
                };
            }
        );
    };

    render() {

        return (
            <div className="app">
                <AppHeader toDo={1} done={3} />
                <span className="input-group mb-3 d-flex">
                    <span><SearchPanel/></span>
                    <span><ItemStatusFilter/></span>
                </span>
                <TodoList
                    todos={this.state.todoData}
                    onDeleted={ this.deleteItem }/>
                <AddItem />
            </div>
        );
    }

}
