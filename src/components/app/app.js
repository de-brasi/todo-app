import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    firstFreeTodoListItemIndex = 0;

    state = {
        todoData: [],
        filterByType: this.filterAllTasks,
        filterByUserQuery: this.filterAllTasks
    };

    createListItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: this.firstFreeTodoListItemIndex++,
            group: 'default',
        };
    }

    createListItemFromJSON = (todoJSONItem) => {
        return {
            label: todoJSONItem['description'],
            important: todoJSONItem['important'],
            done: todoJSONItem['done'],
            id: todoJSONItem['task_id'],
            group: todoJSONItem['group'],
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

        this.setState(
            {filterByType: newFilter}
        );
    }

    setFilterFromUser = (searchQuery) => {
        let newFilter;
        if (!searchQuery) {
            newFilter = this.filterAllTasks;
        } else {
            newFilter = (arr) => arr.filter(
                (item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        this.setState(
            {filterByUserQuery: newFilter}
        );
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

    sendRequestToServer = async (content, method) => {
        return await fetch(content, {method: method})
            .then(
                (response) => {
                    if (!response.ok) {
                        console.log('status', response.status)
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }
            )
            .then(data => {
                console.log('data from server is:', data);
                return data;
            })
            .catch(
                (error) => {
                    console.log('error:', error);
                }
            );
    };
    
    // TODO: use when close window
    // todo: not used yet
    onShutdownServer = async () => {
        console.log('shutdown server button clicked');
        await this.sendRequestToServer(
            'http://localhost:8000/terminate',
            'POST'
        );
        window.close();
    };

    async componentDidMount () {
        const data = await this.sendRequestToServer('http://localhost:8000/get-tasks', 'GET');
        const itemsFromJSON = data.map((jsonTask) => this.createListItemFromJSON(jsonTask));
        this.firstFreeTodoListItemIndex = itemsFromJSON
            .map((item) => item.id)
            .reduce(
                (prev, current) => Math.max(prev, current),
                -1
            ) + 1;
        this.setState({todoData: itemsFromJSON});
    }

    render() {

        // TODO:
        //  todo: отправить обратно на сервер для сохранения,
        //  todo: проверить логи сервера

        const {todoData, filterByType, filterByUserQuery} = this.state;

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <span className="input-group mb-3 d-flex">
                    <span>
                        <SearchPanel
                            onAddFilterRule={this.setFilterFromUser}/>
                    </span>
                    <span>
                        <ItemStatusFilter
                            onFilterChange={this.setFilter}/>
                    </span>
                </span>
                <TodoList
                    todos={
                        filterByType(filterByUserQuery(todoData))
                    }
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
