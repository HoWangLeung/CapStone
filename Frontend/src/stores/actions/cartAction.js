import * as actionTypes from './cartActionType'
import axios from 'axios'

//add cart action
export const addToCart = (id,item_total) => {
  return {
    type: actionTypes.ADD_TO_CART,
    id,
    item_total
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
    id,
  }
}
//add qt action
export const addQuantity = id => {
  return {
    type: actionTypes.ADD_QUANTITY,
    id
  }
}

//get item from api
export const getCoffeeItem = (item) => {
  console.log('reaching getcoffeeitem() ');
  
  return {
    type: actionTypes.GET_COFFEE_ITEM,
    item:item
  }
}


export const getCoffeeItemThunk = () => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/product`).then(res => {
      console.log('cartaction line 43')

      console.log(res.data)
      dispatch(getCoffeeItem(res.data))
    })
  }
}
