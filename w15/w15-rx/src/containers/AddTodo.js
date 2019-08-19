import React from 'react'
import { connect } from 'react-redux'
import { addTodoGenerator } from '../actions'
import { addItemsGenerator } from '../actions'


const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
        <input ref={node => input = node} />
        <button type="submit" onClick={e => {
          e.preventDefault()
          dispatch(addTodoGenerator(input.value))
        }}>
          Add WishList
        </button>
        <button type="submit" onClick={e => {
          e.preventDefault()
          dispatch(addItemsGenerator(input.value))
        }}>
          Add Items
        </button>
      </div>
  )
}

export default connect()(AddTodo)
