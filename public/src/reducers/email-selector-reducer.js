import { CHANGE_EMAILS } from '../actions/index';

const emailSelector = (state = '', action) => {
  switch(action.type) {
    case CHANGE_EMAILS:
      return action.payload;
    default:
      return state;
  }
}

export default emailSelector;