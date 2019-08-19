import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

var ItemList = ({ items}) => (
  
  <ul>
    {items.map(item =>
      <Item
        key={item.id}
        {...item}
      
      />
    )}
  </ul>
)


export default ItemList
