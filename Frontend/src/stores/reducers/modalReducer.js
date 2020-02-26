import * as actionType from '../actions/modalActionType'

const initState = {
  modal: false,
  id: null
}

const showModalReducer = (state, action) => {
  console.log('reached modalReducer.js')
  console.log(action)

  return {
    ...state,
    modal: true,
    id: action.id
  }
}

const hideModalReducer = (state, action) => {
  return {
    ...state,
    modal: false
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SHOW_MODAL:
      return showModalReducer(state, action)
      break
    case actionType.HIDE_MODAL:
      return hideModalReducer(state, action)
    default:
      return state
      break
  }
}

export default reducer
