import React from 'react';
import { Component } from 'react';
import DeviceList from '../containers/device-list';
import ApkSelector from '../containers/apk-selector';
import InstallCheckbox from '../containers/install-checkbox';
import ApiButtons from '../containers/api-buttons';
import FeatureSelector from '../containers/feature-selector';
import EmailController from '../containers/email-controller';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <ApkSelector />
            <InstallCheckbox />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <FeatureSelector />
            </div>
            <div className="row">
              <ApiButtons />
            </div>
          </div>
        </div>
        <div className="row">
          <DeviceList />
        </div> 
      </div>
    );
  }
}

export default App;
