import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({label: ''});
    }

    render() {
        return (
            <form className="item-add-form form-group mb-3 d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control task-input"
                       placeholder="task's description"
                       onChange={this.onLabelChange}
                       value={this.state.label}/>
                <button
                    className="btn btn-success">
                    Add task
                </button>
            </form>
        );
    }

}
