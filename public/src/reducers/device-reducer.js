import { 
  GET_DEVICES,
  CHANGE_DEVICE_FEATURE, 
  SET_DEVICE_RUNNING, 
  RUN_FEATURE 
} from '../actions/index'

const device = (state, action) => {
  switch (action.type) {
    case CHANGE_DEVICE_FEATURE:      
      if (state.name !== action.payload.name) {
        return state;
      }
      return Object.assign({}, state, {
        feature: action.payload.feature
      });
    case SET_DEVICE_RUNNING:
      if (state.name !== action.payload.name) {
        return state;
      }  

      return Object.assign({}, state, {
        isRunning: true
      });
    case RUN_FEATURE:
      if (state.name !== action.payload.data) {
        return state;
      }
      
      return Object.assign({}, state, {
        isRunning: false
      });
    default:
      return state;
  }
}

const devices = (state = [], action) => {
  switch (action.type) {
    case GET_DEVICES:
      return action.payload.data;
    case CHANGE_DEVICE_FEATURE:
      return state.map(d => 
        device(d, action)
      );
    case SET_DEVICE_RUNNING:
      return state.map(d => 
        device(d, action)
      );
    case RUN_FEATURE:
      return state.map(d => 
        device(d, action)
      );
    default:
      return state;
  }
}

export default devices;
