import React,{ Component } from 'react';

import './search-panel.css';


// onLabelSearchChange = (event) => {
//   console.log (event.target.value);
//   // this.setState ({
//   //     label: event.target.value
//   // });
// };


export default class SearchPanel extends Component {

  state = {
    serch: ''
  }

  onSearchChange = (event) => {
    this.setState ({
      serch: event.target.value
    });
 };

  onSubmitSearch = (event) => {
    event.preventDefault();
    this.props.onVisibleItem(this.state.serch);
    this.setState ({
      serch:''
    });
  };

  render () {
    const {todos}= this.props
    const elements = todos.map( (item) => {
      const { id, label } = item;
      return (
        <option key={id*10} value={label}  />
      );
    });
    return (
      <form onSubmit= {this.onSubmitSearch}>
        <input  type="text"
                onChange = { this.onSearchChange }
                className="form-control search-input"
                placeholder="type to search"
                list ="todo"
                value = {this.state.serch}
                 />
        <datalist id="todo" >
            {elements}
        </datalist>
      </form>
    );
  };
};




// const TodoList = ({ todos }) => {

// const elements = todos.map((item) => {
// const { id, ...itemProps } = item;


// return (
// <li key={id} className={classNames}>
// <TodoListItem
// {...itemProps }
// onDeleted = {()=> onDeleted(id)}
// onToggleImportant = {()=> onToggleImportant(id)}
// onToggleDone = {()=> onToggleDone(id)} />
// </li>
// );
// });

// return (
// <ul className="list-group todo-list">
// { elements }
// </ul>
// );
// };
