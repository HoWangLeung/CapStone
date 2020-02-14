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
      title: 'Winter body',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: 'Adidas',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: 'Vans',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: 'White',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: 'Cropped-sho',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: 'Blues',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 90,
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
