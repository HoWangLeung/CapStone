import * as actionTypes from '../actions/uiActionType'

const initialState = {
  isLoginModalOpen: false
}

const showLoginModalReducer = state => {
  // generate a new state based on state (current state) and action
  return {
    ...state,
    isLoginModalOpen: true
  }
}

const hideLoginModalReducer = state => {
  // generate a new state based on state (current state) and action
  return {
    ...state,
    isLoginModalOpen: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOGIN_MODAL:
      return showLoginModalReducer(state, action)
    case actionTypes.HIDE_LOGIN_MODAL:
      return hideLoginModalReducer(state)
    default:
      return state
  }
}

export default reducer
