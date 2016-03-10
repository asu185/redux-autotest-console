import React, { Component } from 'react';
import DeviceList from '../containers/device-list';
import ApkSelector from '../containers/apk-selector';
import InstallCheckbox from '../containers/install-checkbox';
import ApiButtons from '../containers/api-buttons';
import EmailSelector from '../containers/email-selector';

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
            <EmailSelector />
            <ApiButtons />
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
