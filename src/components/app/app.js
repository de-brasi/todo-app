import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    firstFreeTodoListItemIndex = 0;

    createListItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: this.firstFreeTodoListItemIndex++
        };
    }

    static findElementByIndex = (collection, id) => {
        return collection.findIndex((el) => el.id === id);
    }

    state = {
        todoData: [
            this.createListItem('Какая-то задача'),
            this.createListItem('И еще задача'),
            this.createListItem('И еще')
        ]
    };

    deleteItem = (id) => {
        this.setState(
            (state) => {
                const erasedElementIndex = App.findElementByIndex(state.todoData, id);

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
                const newItem = this.createListItem(tasksDescription);

                const updatedTodos = [...state.todoData, newItem];

                return { todoData: updatedTodos };
            }
        );
    }

    onToggleImportant = (id) => {
        this.setState(
            (state) => {
                const updatedElementIndex = App.findElementByIndex(state.todoData, id);

                const sourceItem = this.state.todoData[updatedElementIndex];

                const updatedItem = {
                    ...sourceItem,
                    important: !sourceItem.important
                };

                const res = [
                    ...state.todoData.slice(0, updatedElementIndex),
                    updatedItem,
                    ...state.todoData.slice(updatedElementIndex + 1)
                ];

                return { todoData: res };
            }
        );
    };

    onToggleDone = (id) => {
        this.setState(
            (state) => {
                const updatedElementIndex = App.findElementByIndex(state.todoData, id);

                const sourceItem = this.state.todoData[updatedElementIndex];

                const updatedItem = {
                    ...sourceItem,
                    done: !sourceItem.done
                };

                const res = [
                    ...state.todoData.slice(0, updatedElementIndex),
                    updatedItem,
                    ...state.todoData.slice(updatedElementIndex + 1)
                ];

                return { todoData: res };
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
