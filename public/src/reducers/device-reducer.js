import { 
  GET_DEVICES,
  CHANGE_DEVICE_FEATURE, 
  CHANGE_DEVICE_LOCK, 
  RUN_FEATURE,
  EMPTY_DEVICE_FEATURE,
  GET_DEVICE_REPORTS
} from '../actions/index';

const device = (state, action) => {
  switch (action.type) {
    case CHANGE_DEVICE_FEATURE:      
      if (state.name !== action.payload.name) {
        return state;
      }
      return Object.assign({}, state, {
        feature: action.payload.feature
      });
    case CHANGE_DEVICE_LOCK:
      if (state.name !== action.payload.device.name) {
        return state;
      }
      return Object.assign({}, state, {
        lock: !action.payload.device.lock
      });
    case RUN_FEATURE:
      if (state.name !== action.payload.data.name) {
        return state;
      }
      // Testing finish, unlock the device and refresh the reports           
      let newReports = state.reports.slice(0) || [];
      newReports.unshift(action.payload.data.report);
      return Object.assign({}, state, {
        lock: false,
        reports: newReports
      });
    case EMPTY_DEVICE_FEATURE:
      if (state.name !== action.payload.data) {
        return state;
      }
      return Object.assign({}, state, {
        feature: ''
      });
    case GET_DEVICE_REPORTS:
      return Object.assign({}, state, {
        reports: action.payload.data
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
    case CHANGE_DEVICE_LOCK:
      return state.map(d => 
        device(d, action)
      );
    case RUN_FEATURE:
      return state.map(d => 
        device(d, action)
      );
    case EMPTY_DEVICE_FEATURE:
      return state.map(d =>
        device(d, action)
      );
    case GET_DEVICE_REPORTS:
      return state.map(d =>
        device(d, action)
      );
    default:
      return state;
  }
}

export default devices;
