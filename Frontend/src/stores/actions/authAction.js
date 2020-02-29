import * as authActionType from './authActionType'
import axios from 'axios'
var jwtDecode = require('jwt-decode')

export function loginSuccessAction (token, is_admin) {
  return {
    type: authActionType.LOGIN,
    token,
    is_admin
  }
}

export const logoutAction = user_id => {
  localStorage.clear('token')
  localStorage.clear('is_admin')
  return {
    type: authActionType.LOGOUT
  }
}

export const loginThunk = (email, password) => {
  return dispatch => {
    console.log('trying to log in user2')

    console.log(email, password)

    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response.data.is_admin)

        if (response.data !== null) {
          console.log('line35')

          let token = response.data.token
          let decoded = jwtDecode(token)
          console.log(decoded.is_admin)

          // thunk can conditionally dispatch actions
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('is_admin', decoded.is_admin)
          dispatch(
            loginSuccessAction(response.data.token, decoded.is_admin)
          )
        } else {
          // you can dispatch other actions here if needed
          // for example, to show a error message in a modal
        }
      })
      .catch(err => console.log('Error: ', err))
  }
}
