import { CHANGE_INSTALL_FLAG } from '../actions/index';

const installCheckbox = (state=false, action) => {  
  switch (action.type) {
    case CHANGE_INSTALL_FLAG:      
      return !state;
    default:
      return state;
  }
}

export default installCheckbox;