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

    findElementByIndex(collection, id) {
        return collection.findIndex((el) => el.id === id);
    }

    filterAllTasks = (arr) => arr;

    filterActiveTasks = (arr) => arr.filter((item) => !item.done);

    filterDoneTasks = (arr) => arr.filter((item) => item.done);

    setFilter = (description) => {
        let newFilter;

        if (description === 'all') {
            newFilter = this.filterAllTasks;
        } else if (description === 'active') {
            newFilter = this.filterActiveTasks;
        } else if (description === 'done') {
            newFilter = this.filterDoneTasks;
        } else {
            throw new Error("unexpected filter's description");
        }

        this.setState((state) => {
            return {filter: newFilter};
        });
    }

    state = {
        todoData: [
            this.createListItem('Какая-то задача'),
            this.createListItem('И еще задача'),
            this.createListItem('И еще')
        ],
        filter: this.filterAllTasks
    };

    showSpecificTasks = (someArg) => {
        console.log('search rule', someArg);
    };

    deleteItem = (id) => {
        this.setState(
            (state) => {
                const erasedElementIndex = this.findElementByIndex(state.todoData, id);

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

                return {todoData: updatedTodos};
            }
        );
    }

    toggleProperty(arr, id, propName) {
        const updatedElementIndex = this.findElementByIndex(arr, id);

        const sourceItem = arr[updatedElementIndex];

        const updatedItem = {
            ...sourceItem,
            [propName]: !sourceItem[propName]
        };

        return [
            ...arr.slice(0, updatedElementIndex),
            updatedItem,
            ...arr.slice(updatedElementIndex + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(
            (state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'important')
                };
            }
        );
    };

    onToggleDone = (id) => {
        this.setState(
            (state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'done')
                };
            }
        );
    };

    render() {

        const {todoData, filter} = this.state;

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <span className="input-group mb-3 d-flex">
                    <span>
                        <SearchPanel
                            onAddFilterRule={this.showSpecificTasks}/>
                    </span>
                    <span>
                        <ItemStatusFilter
                            onFilterChange={this.setFilter}/>
                    </span>
                </span>
                <TodoList
                    todos={filter(todoData)}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }

}
