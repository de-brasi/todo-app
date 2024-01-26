import React from 'react';

import './add-item.css';

const AddItem = () => {
    return (
        <span className="form-group mb-3 d-flex">
            <input type="text"
                   className="form-control task-input"
                    placeholder="task's description">
            </input>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-success">
                    Add task
                </button>
            </div>
        </span>
    );
};

export default AddItem;