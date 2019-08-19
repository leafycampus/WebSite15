
export var todos1 = (state={
  items:[],
  todos:[]
}, action) => {
  console.log("in todos1 "+JSON.stringify(state))
  switch (action.type) {
    case 'ADD_TODO':
    var y ={
      id: action.id,
      text: action.text,
      completed: false
    } 
    state.todos.push(y)
    return Object.assign({},state);
    
    // state.push(y)
    
   
    default:
      return state
  }
}


