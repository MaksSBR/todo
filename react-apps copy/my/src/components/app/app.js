import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '..//search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

export default class App extends Component {

   maxId = 100;

  state = {
    todoData : [
      this.createNewItem('Drink Coffee'),
      this.createNewItem('Make Awesome App'),
      this.createNewItem('Have a lunch'),
    ]
  };

  createNewItem (label)  {
    return  {
      label,
      important: false,
      done: false,
      ininvisibility:false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState( ({todoData}) =>{
      const idx = todoData.findIndex( (el) => el.id===id );
      // todoData.splice(idx,1);
      // [a,b,c,d,e]
      // [a,b,  d,e]
      // const bef = todoData.slice(0,idx);
      // const aft = todoData.slice(idx+1);
      // const newArr = [...bef,...aft];
      const newArr = [
        ...todoData.slice(0,idx),
        ...todoData.slice(idx+1)
      ];

      return {
        todoData :newArr
      };
    } );
  };

  addItem =(text) => {
    const newItem =this.createNewItem(text);

    this.setState ( ({todoData}) => {
    const newArr = [
      ...todoData,
      newItem
    ];
      return {
        todoData :newArr
      };
    } );
  };

  toggleProperty  (arr, id, propName) {
    const idx = arr.findIndex( (el) => el.id===id );
    const olditem = arr[idx];
    const newItem = {...olditem,[propName]: !olditem[propName]};
    // const newItem = {...olditem};
    // olditem.important=!olditem.important

    return [
      ...arr.slice(0,idx),
      newItem,
      ...arr.slice(idx+1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState ( ( {todoData} )=>{
      return {
        todoData: this.toggleProperty(todoData,id,'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState ( ( {todoData} )=>{
      return {
        todoData: this.toggleProperty(todoData,id,'done')
      };
    });
  };

  onVisibleAll = () => {
    this.setState( ( {todoData} ) =>{
      const visibleAll = this.state.todoData.map ( ( el )=>{
        el.ininvisibility = false;
        return el ;
      });
      return {
        todoData:visibleAll
      };
    });
  };

  onVisibleDone = () => {
    this.onVisibleAll();
    this.setState( ( {todoData} ) =>{
      const visibleDone = this.state.todoData.map ( ( el )=>{
        if ( !el.done ) {
          el.ininvisibility = true;
        };
        return el ;
      });
      return {todoData:visibleDone }
    });
  };

  onVisibleActive = () => {
    this.onVisibleAll();
    this.setState( ( {todoData} ) =>{
      const visibleActive = this.state.todoData.map ( ( el )=>{
        if ( el.done ) {
          el.ininvisibility = true;
        };
        return el ;
      });
      return {
        todoData:visibleActive
      };
    });
  };

  onVisibleNull = () => {
    this.setState( ( {todoData} ) =>{
      const visibleAll = this.state.todoData.map ( ( el )=>{
        el.ininvisibility = true;
        return el ;
      });
      return {
        todoData:visibleAll
      };
    });
  };
  onVisibleItem = (labSearch) => {
    this.onVisibleNull ();
    this.setState ( ({todoData}) => {
      const visibleActive = this.state.todoData.map ( ( el )=>{
        if ( el.label ===labSearch ) {
                 el.ininvisibility = false;
        };
        return el
      } );
      return {
        todoData:visibleActive
      };
    });
  };


  render () {
    const {todoData} = this.state;
    const doneCount = todoData
                        .filter( (el) => el.done )
                        .length;
    //filter create new array > в который помещает элементы{el} у которых  {el.done} =true
    // и выводит длину {.length} этого массива
    const todoCount = todoData
                        .length- doneCount;
    //из общей длины массива (кол-во записей) вычетаем кол-во выполненых {doneCount}

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel  todos={todoData}
                        onVisibleItem={this.onVisibleItem} />
          <ItemStatusFilter
            onVisibleAll = { this.onVisibleAll }
            onVisibleDone = {this.onVisibleDone}
            onVisibleActive = {this.onVisibleActive}
          />
        </div>

        <TodoList
          todos={todoData} // todos = {this.state.todoData};
          onDeleted ={ this.deleteItem }
          onToggleImportant ={this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
          />
        <ItemAddForm
          onAdditem ={ this.addItem } />
      </div>
    );
  };
;}


// const App = () => {

//   const todoData = [
//     { label: 'Drink Coffee', important: false, id: 1 },
//     { label: 'Make Awesome App', important: true, id: 2 },
//     { label: 'Have a lunch', important: false, id: 3 }
//   ];

//   return (
//     <div className="todo-app">
//       <AppHeader toDo={1} done={3} />
//       <div className="top-panel d-flex">
//         <SearchPanel />
//         <ItemStatusFilter />
//       </div>

//       <TodoList
//         todos={todoData}
//         onDeleted ={ (id) => console.log('del',id) } />
//     </div>
//   );
// };

// export default App ;
