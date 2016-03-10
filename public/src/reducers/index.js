import { combineReducers } from 'redux';
import deviceReducer from './device-reducer';
import featureOptionsReducer from './feature-options-reducer';
import apkSelectorReducer from './apk-selector-reducer';
import installCheckboxReducer from './install-checkbox-reducer';
import emailOptionsReducer from './email-options-reducer';
import emailSelectorReducer from './email-selector-reducer';

const rootReducer = combineReducers({
  devices: deviceReducer,
  featureOptions: featureOptionsReducer,
  apkSelector: apkSelectorReducer,
  installCheckbox: installCheckboxReducer,
  emailOptions: emailOptionsReducer,
  emailSelector: emailSelectorReducer
});

export default rootReducer;
