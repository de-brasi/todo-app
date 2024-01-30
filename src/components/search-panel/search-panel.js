import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        searchRequest: ''
    };

    onInputText = (e) => {
        this.setState(
            {searchRequest: e.target.value}
        );
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        this.props.onAddFilterRule(this.state.searchRequest);
    };

    render() {
        return (
            <form
                onSubmit={this.onSubmitForm}>
                <input
                    className="form-control search-input"
                    placeholder="type to search"
                    value={this.state.searchRequest}
                    onChange={this.onInputText}
                />
            </form>
        );
    }
};