import React from 'react';
import { Component } from 'react';
import DeviceList from '../containers/device-list';
import ApkSelector from '../containers/apk-selector';
import InstallCheckbox from '../containers/install-checkbox';
import ApiButtons from '../containers/api-buttons';

class App extends Component {
  render() {
    return (
      <div>
        <ApkSelector />
        <ApiButtons />
        <InstallCheckbox />
        <DeviceList />        
      </div>
    );
  }
}

export default App;
