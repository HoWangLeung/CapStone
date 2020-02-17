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
  ADD_QUANTITY
} from '../actions/cartActionType'
import { act } from 'react-dom/test-utils'

const initState = {
 
  items: [
    {
      id: 1,
      title: 'Cappuccino',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 30,
      img: Item1
    },
    {
      id: 2,
      title: 'Matcha Mocha',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 40,
      img: Item2
    },
    {
      id: 3,
      title: 'Mocha',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 35,
      img: Item3
    },
    {
      id: 4,
      title: 'Flat White',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 40,
      img: Item4
    },
    {
      id: 5,
      title: 'Lattae',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 38,
      img: Item5
    },
    {
      id: 6,
      title: 'Espresso',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 31,
      img: Item6
    }
  ],
  addedItems: [],
  total: 0
}

const addTocartReducer = (state, action) => {
  return {
    ...state
  }
}

const removeItemReducer = (state, action) => {
  return {
    ...state
  }
}

const addQuantity = (state, action) => {
  return {
    ...state
  }
}

const subQuantity = (state, action) => {
  return {
    ...state
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addTocartReducer(state, action);
    case REMOVE_ITEM:
        return removeItemReducer(state, action);
    case ADD_QUANTITY:
        return addQuantity(state, action);
    case SUB_QUANTITY:
        return subQuantity(state, action)
    default:
      return state;
  }
}

export default reducer
