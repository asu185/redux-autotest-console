import { combineReducers } from 'redux';
import deviceReducer from './device-reducer';
import featureOptionsReducer from './feature-options-reducer';
import apkSelectorReducer from './apk-selector-reducer';
import installCheckboxReducer from './install-checkbox-reducer';
import emailListReducer from './email-list-reducer';
import reportReducer from './report-reducer';

const rootReducer = combineReducers({
  devices: deviceReducer,
  featureOptions: featureOptionsReducer,
  apkSelector: apkSelectorReducer,
  installCheckbox: installCheckboxReducer,
  emailList: emailListReducer,
  reports: reportReducer
});

export default rootReducer;
