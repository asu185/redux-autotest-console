import { combineReducers } from 'redux';
import deviceReducer from './device-reducer';
import featureOptionsReducer from './feature-options-reducer';
import apkSelectorReducer from './apk-selector-reducer';
import InstallCheckboxReducer from './install-checkbox-reducer';

const rootReducer = combineReducers({
  devices: deviceReducer,
  featureOptions: featureOptionsReducer,
  apkSelector: apkSelectorReducer,
  installCheckbox: InstallCheckboxReducer
});

export default rootReducer;
