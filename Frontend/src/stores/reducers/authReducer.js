import * as actionTypes from '../actions/authActionType'

const initialState = {
  isLoggedIn: localStorage.getItem('token') !== null,
  token: localStorage.getItem('token') || null
}

const loginReducer = (state, action) => {
  return {
    ...state,
    isLoggedIn: true,
    token: action.token
  }
}

const logoutReducer = state => {
  return {
    ...state,
    isLoggedIn: false,
    token: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return loginReducer(state, action)
    case actionTypes.LOGOUT:
      return logoutReducer(state)
    default:
      return state
  }
}

export default reducer
