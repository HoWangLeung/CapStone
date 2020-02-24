import * as authActionType from './authActionType'
import axios from 'axios'

export function loginSuccessAction (token) {
  return {
    type: authActionType.LOGIN,
    token: token
  }
}

export const logoutAction = user_id => {
  localStorage.clear("token");
  return {
    type: authActionType.LOGOUT
  }
}

export const loginThunk = (email, password) => {
  return dispatch => {
    console.log('trying to log in user2');
    
    console.log(email, password)

    
    return axios
      .post('http://localhost:8000/api/login', {
        email: email,
        password: password
      })
      .then(response => {
        console.log('sdf')

        if (response.data !== null) {
          // thunk can conditionally dispatch actions
          localStorage.setItem('token', response.data.token)
          dispatch(loginSuccessAction(response.data.token))
        } else {
          // you can dispatch other actions here if needed
          // for example, to show a error message in a modal
        }
      })
      .catch(err => console.log('Error: ', err))
  }
}
