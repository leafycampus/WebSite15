var nextTodoId = 0
var nextItemId = 0
export var addTodoGenerator = text => {
  console.log("in todogenerator")
  let x = {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
  return x
}

export var addItemsGenerator = text => {
console.log("in itemgenerator")
let x = {
  type: 'ADD_ITEM',
  id: nextTodoId++,
  text
}
return x
}


