import { GET_FEATURE_OPTIONS } from '../actions/index';

const featureOptions = (state = [], action) => {
  switch (action.type) {
    case GET_FEATURE_OPTIONS:      
      return action.payload.data;
    default:
      return state;
  }
}

export default featureOptions;