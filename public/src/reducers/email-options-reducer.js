import { GET_EMAIL_OPTIONS, UPDATE_EMAIL_OPTIONS } from '../actions/index';

const emailOptions = (state = [], action) => {
  switch (action.type) {
    case GET_EMAIL_OPTIONS:
      return action.payload.data;    
    case UPDATE_EMAIL_OPTIONS:     
      return action.payload.data;
    default:
      return state;
  }
}

export default emailOptions;
