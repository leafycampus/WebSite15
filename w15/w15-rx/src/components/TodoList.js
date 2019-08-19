import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'


var TodoList = ({ todos}) => {
  console.log("in todolist view "+ JSON.stringify(todos))
  var y = 
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
      
      />
    )}
  </ul>
  return y
    }


export default TodoList
