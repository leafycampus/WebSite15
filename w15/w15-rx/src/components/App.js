import React from 'react'
import AddTodo from '../containers/AddTodo'
import  {V} from '../containers/VisibleTodoList'
import  {V1} from '../containers/VisibleTodoList'

function Hello(props){
  return <h2>{props.message}</h2>
}

const App = () => (
  <div >
    <AddTodo />
    <V1/>
    <V/>
    <Hello message="hi hello"/>   
  </div>
)

export default App
