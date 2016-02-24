import { combineReducers } from 'redux';
import deviceReducer from './device-reducer';
import featureOptionsReducer from './feature-options-reducer';

const rootReducer = combineReducers({
  devices: deviceReducer,
  featureOptions: featureOptionsReducer
});

export default rootReducer;
