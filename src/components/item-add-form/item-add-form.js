import React from 'react';

import './item-add-form.css';

const ItemAddForm = ({ onAdd }) => {
    return (
        <form className="item-add-form form-group mb-3 d-flex">
            <input type="text"
                   className="form-control task-input"
                   placeholder="task's description">
            </input>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={ () => onAdd('new task') }>
                    Add task
                </button>
            </div>
        </form>
    );
};

export default ItemAddForm;