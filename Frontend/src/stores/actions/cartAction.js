import * as actionTypes from './cartActionType'
import axios from 'axios'

//add cart action
export const addToCart = id => {
  return {
    type: actionTypes.ADD_TO_CART,
    id
  }
}
//remove item action
export const removeItem = id => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id
  }
}
//subtract qt action
export const subtractQuantity = id => {
  return {
    type: actionTypes.SUB_QUANTITY,
    id
  }
}
//add qt action
export const addQuantity = id => {
    return {
      type: actionTypes.ADD_QUANTITY,
      id
    }
  }
