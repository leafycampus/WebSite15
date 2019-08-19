import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import ItemList from '../components/ItemsList'



const mapStateToProps = state => {
  console.log("in mapStateToProps")
  console.log("in mapStateToProps " + JSON.stringify(state.todos1.todos))
  let y = {
    todos:[...state.todos1.todos]
  }
  return y;
}
const mapStateToProps1 = state => {
  console.log("in mapStateToProps1 " + JSON.stringify(state))
  let y = {
    items: [...state.items.items]
  }
  return y;
}


export var V = connect(
  mapStateToProps,

)(TodoList)

export const V1 = connect(
  mapStateToProps1,

)(ItemList)


