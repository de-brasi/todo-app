import React, { Component } from 'react';

import './item-status-filter.css';

const ButtonTags = {
    ALL: 'all',
    ACTIVE: 'active',
    DONE: 'done'
};

const ButtonClasses = {
    CHOSEN: 'btn btn-primary',
    DEFAULT: 'btn btn-outline-secondary'
};

export default class ItemStatusFilter extends Component {

    state = {
        activeButton: ButtonTags.ALL
    };

    onButtonAllClick = () => {
        this.setState(
            {activeButton: ButtonTags.ALL}
        );
        this.props.onFilterChange(ButtonTags.ALL)
    };

    onButtonActiveClick = () => {
        this.setState(
            {activeButton: ButtonTags.ACTIVE}
        );
        this.props.onFilterChange(ButtonTags.ACTIVE)
    };

    onButtonDoneClick = () => {
        this.setState(
            {activeButton: ButtonTags.DONE}
        );
        this.props.onFilterChange(ButtonTags.DONE)
    };

    render() {

        const buttonsClassNames = {
            [ButtonTags.ALL]: (
                this.state.activeButton === ButtonTags.ALL ? ButtonClasses.CHOSEN : ButtonClasses.DEFAULT
            ),
            [ButtonTags.ACTIVE]: (
                this.state.activeButton === ButtonTags.ACTIVE ? ButtonClasses.CHOSEN : ButtonClasses.DEFAULT
            ),
            [ButtonTags.DONE]: (
                this.state.activeButton === ButtonTags.DONE ? ButtonClasses.CHOSEN : ButtonClasses.DEFAULT
            ),
        };

        console.log(buttonsClassNames)

        return (
            <div className="btn-group">
                <button
                    type="button"
                    className={ buttonsClassNames[ButtonTags.ALL] }
                    onClick={ this.onButtonAllClick }>All</button>
                <button
                    type="button"
                    className={ buttonsClassNames[ButtonTags.ACTIVE] }
                    onClick={ this.onButtonActiveClick }>Active</button>
                <button
                    type="button"
                    className={ buttonsClassNames[ButtonTags.DONE] }
                    onClick={ this.onButtonDoneClick }>Done</button>
            </div>
        );
    }
}