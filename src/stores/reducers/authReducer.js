import * as actionTypes from '../actions/authActionType'

const initialState = {
  isLoggedIn: false,
  userId: null
}

const loginReducer = (state, action) =>{
    return{
        ...state,
        isLoggedIn:true,
        userId:action.userId
    }
}

const logoutReducer = (state, action)=>{
    return{
        ...state,
        isLoggedIn:false,
        userId:null
    }
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.LOGIN:
            return loginReducer(state, action);
        case actionTypes.LOGOUT:
            return logoutReducer(state, action);
        default:
            return state;
    }
}

export default reducer;