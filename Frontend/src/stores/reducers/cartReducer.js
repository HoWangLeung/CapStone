import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  GET_COFFEE_ITEM
} from '../actions/cartActionType'
import { act } from 'react-dom/test-utils'

const initState = {
 
  items: [
    
  ],
  addedItems: [],
  sub_total: 0,
  grand_total: 0,

  
}

const addToCartReducer = (state, action) => {
  console.log('in addtocartreducer');
  console.log(action.item_total);
  let item_total = action.item_total
  let index = action.id - 1
  let items = state.items
  console.log(items[index]);
  console.log(items[index].quantity);
  console.log(items[index].product_price);
  console.log(action.id-1);
  
  
  return {
    ...state,
    grand_total: state.grand_total + item_total
    
  }
}

const removeItemReducer = (state, action) => {
  return {
    ...state
  }
}

const addQuantity = (state, action) => {
  let addedItem = state.items.find(item=> item.id === action.id)
    addedItem.quantity+=1

  return {
    ...state,


  }
}

const subQuantity = (state, action) => {

  return {
    ...state
  }
}

const getCoffeeItem = (state, action) => {

// let item_array = action.item
// for(let i = 0;i < item_array.length;i++){
//   item_array[i].quantity = 0
// }
  
  return {
    ...state,
    items: action.item
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCartReducer(state, action);
    case REMOVE_ITEM:
        return removeItemReducer(state, action);
    case ADD_QUANTITY:
        return addQuantity(state, action);
    case SUB_QUANTITY:
        return subQuantity(state, action);
    case GET_COFFEE_ITEM:
      return getCoffeeItem(state, action);
    default:
      return state;
  }
}

export default reducer
// {
//   id: 1,
//   title: 'Cappuccino',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 30,
//   img: Item1
// },
// {
//   id: 2,
//   title: 'Matcha Mocha',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 40,
//   img: Item2
// },
// {
//   id: 3,
//   title: 'Mocha',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 35,
//   img: Item3
// },
// {
//   id: 4,
//   title: 'Flat White',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 40,
//   img: Item4
// },
// {
//   id: 5,
//   title: 'Lattae',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 38,
//   img: Item5
// },
// {
//   id: 6,
//   title: 'Espresso',
//   desc:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
//   price: 31,
//   img: Item6
// }