import { ADD_NEW_EMAIL, REMOVE_EMAIL, GET_EMAILS } from '../actions/index';

const emailList = (state = [], action) => {
  switch (action.type) {
    case GET_EMAILS:
      return action.payload.data;
    case ADD_NEW_EMAIL:
      const newEmail = action.payload.data;
      return state.concat(newEmail);
    case REMOVE_EMAIL:
      const removedEmail = action.payload.data;
      return state.filter(f => {        
        return f.value !== removedEmail.value;
      });
    default:
      return state;
  }
}

export default emailList;
