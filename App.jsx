/*import React from 'react';
import {Link} from 'react-router';


class App extends React.Component {
  render() {
    return(
      <div>
      <ul>
      <li><Link to="home">Home</Link></li>
      <li><Link to="about">About</Link></li>
      <li><Link to="contact">Contact</Link></li>
      </ul>

      {this.props.children}
      </div>
    )
  }
}

export default App;



export class Home extends React.Component {
  render() {
    return (
      <h1>Home Page Content</h1>
    )
  }
}



export class About extends React.Component {
  render() {
    return (
      <h1>About Page Content</h1>
    )
  }
}


export class Contact extends React.Component {
  render()  {
    return (
      <h1>Contact Page Content</h1>
    )
  }
}
*/
/*
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './actions/actions'

import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'


class App extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props

      return (
         <div>

            <AddTodo
               onAddClick = {text =>
               dispatch(addTodo(text))}
            />

            <TodoList todos = {visibleTodos}/>

         </div>
      )
   }
}

function select(state) {
   return {
      visibleTodos: state.todos
   }
}

export default connect(select)(App)
*/


import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class App extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         items: ['Item 1...', 'Item 2...', 'Item 3...', 'Item 4...']
      }

      this.handleAdd = this.handleAdd.bind(this);
   };

   handleAdd() {
      var newItems = this.state.items.concat([prompt('Create New Item')]);
      this.setState({items: newItems});
   }

   handleRemove(i) {
      var newItems = this.state.items.slice();
      newItems.splice(i, 1);
      this.setState({items: newItems});
   }

   render() {
      var items = this.state.items.map(function(item, i) {
         return (
            <div key = {item} onClick = {this.handleRemove.bind(this, i)}>
               {item}
            </div>
         );

      }.bind(this));

      return (
         <div>
            <button onClick = {this.handleAdd}>Add Item</button>

            <ReactCSSTransitionGroup transitionName = "example"
               transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
               {items}
            </ReactCSSTransitionGroup>
         </div>
      );
   }
}

export default App;
