import * as uiActionTypes from "./uiActionType";

// action creaters: functions that generate actions
// actions are objects that have `type` as a key
export const showLoginModalAction = () => {

    
  return {
    type: uiActionTypes.SHOW_LOGIN_MODAL
  };
};

export const hideLoginModalAction = () => {
  return {
    type: uiActionTypes.HIDE_LOGIN_MODAL
  };
};
