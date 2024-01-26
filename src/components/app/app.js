import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            {label: 'Какая-то задача', important: false, done: false, id: 1},
            {label: 'И еще задача', important: false, done: false, id: 2},
            {label: 'И еще', important: false, done: false, id: 3}
        ],
        lastUsedId: 4
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

    addItem = (tasksDescription) => {

        this.setState(
            (state) => {
                const newTasksId = state.lastUsedId + 1;
                const newItem = {
                    label: tasksDescription, important: false, done: false, id: newTasksId
                };

                const updatedTodos = [...state.todoData, newItem];

                return {
                    todoData: updatedTodos,
                    lastUsedId: newTasksId
                };
            }
        );

    }

    onToggleImportant = (id) => {
        console.log(`element with ${id} marked as important`);
    };

    onToggleDone = (id) => {
        console.log(`element with ${id} marked as done`);
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
                    todos={ this.state.todoData }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm
                    onAdd = { this.addItem }
                />
            </div>
        );
    }

}
