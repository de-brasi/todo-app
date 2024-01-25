import React from 'react';

import './app-header.css';

const AppHeader = ({toDo, done}) => {
    return (
        <div className="d-flex app-header">
            <h1>Todo List</h1>
            <h3>{toDo} more to do, {done} done</h3>
        </div>
    );
};

export default AppHeader;