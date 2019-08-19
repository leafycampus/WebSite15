const items1 = (state={
    items: [],
    todos: [],
   
}, action) => {
   
    switch (action.type) {
        case 'ADD_ITEM':
            var y = {
                id: action.id,
                text: action.text,
                completed: false
            }

            state.items.push(y)
            return Object.assign({}, state);

       
        default:

            return state

    }
}

export default items1
