import React,{ Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label : ''
    };

    onLabelChange = (event) => {
        // console.log (event.target.value);
        this.setState ({
            label: event.target.value
        });
    };

    onSubmit = (event) => {
        const { onAdditem } = this.props;

        event.preventDefault();

        onAdditem(this.state.label);
        // this.props.onItemAdded
        // this.state.label

        this.setState ({
            label:''
        });
    };


    render () {
        return (
            <form className = "item-add-form d-flex"
                  onSubmit = {this.onSubmit}>
                {/* {this.state.label} */}
                <input type ="text"
                       className = "form-control"
                       onChange = { this.onLabelChange }
                       placeholder = "What needs to be done "
                       value = {this.state.label} />
                <button className= "btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    };
};
