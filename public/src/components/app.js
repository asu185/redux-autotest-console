import React from 'react';
import { Component } from 'react';
import DeviceList from '../containers/device-list';
import ApkSelector from '../containers/apk-selector';

class App extends Component {
  render() {
    return (
      <div>
        <ApkSelector />
        <DeviceList />        
      </div>
    );
  }
}

export default App;
