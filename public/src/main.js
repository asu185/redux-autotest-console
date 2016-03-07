import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/app';
import reducers from './reducers';
import { getDevices, getFeatureOptions, getApkList, getEmails } from './actions/index';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStoreWithMiddleware(reducers);
store.dispatch(getDevices());
store.dispatch(getFeatureOptions());
store.dispatch(getApkList());
store.dispatch(getEmails());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
