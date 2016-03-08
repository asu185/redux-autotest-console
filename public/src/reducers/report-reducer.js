import { GET_REPORTS } from '../actions/index';

const reports = (state = [], action) => {
  switch(action.type) {
    case GET_REPORTS:      
      return action.payload.data;
    default:
      return state;
  }
}

export default reports;