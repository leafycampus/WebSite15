import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App1 from './components/App'
import combineReducers from './reducers/index'
import reducer from './reducers/index';

const store = createStore(reducer)

// const store = createStore(combineReducers({
//   todos1,
//   items
  
// }))



render(
  
  <Provider store={store}>
    <App1 />
  </Provider>,
  document.getElementById('root')
)
