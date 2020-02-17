import * as authActionTypes from './authActionType'

export const loginAction = userID => {
  return {
    type: authActionTypes.LOGIN,
    userID: userID
  }
}

export const logoutAction = userID => {
  return {
    type: authActionTypes.LOGOUT
  }
}
