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
var fn_fromConnect  =  connect(mapStateToProps)
var res_eval_forTodos = fn_fromConnect(TodoList)
export var V = res_eval_forTodos

// export var V = connect(
//   mapStateToProps,

// )(TodoList)


export const V1 = connect(
  mapStateToProps1,

)(ItemList)


