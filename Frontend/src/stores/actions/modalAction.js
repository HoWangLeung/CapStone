import * as actionType from './modalActionType'

export const showModal = id => {
    console.log('reached modalAction.js');
    
  return {
    type: actionType.SHOW_MODAL,
    id
  }
}

export const hideModal = id =>{
    return{
        type:actionType.HIDE_MODAL,
        id
    }
}
