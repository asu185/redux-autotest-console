import React from 'react'
import { connect } from 'react-redux';
import { 
  getDevices, 
  runFeatures, 
  onChangeDeviceLock,
  onEmptyDeviceFeature
} from '../actions/index';
import FeatureEditor from './feature-editor';
import EmailEditor from '../containers/email-editor';

const ApiButtons = ({ 
  devices,
  selectedApk,
  installFlag,
  getDevices,
  runFeatures 
}) => {  
  // console.log('Render api-buttons');
  return (
    <div>
      <div className="btn-group pull-right" role="group" aria-label="...">
        <EmailEditor />
        <FeatureEditor />
        <a className="btn btn-default" onClick={getDevices}>
          <span className="glyphicon glyphicon-repeat"></span>
          Sync Devices
        </a>
        <a className="btn btn-default" onClick={() => {
          devices.map(device => 
            runFeatures(device, selectedApk, installFlag)
          )}}>
          <span className="glyphicon glyphicon-play"></span>
          Run
        </a>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    devices: state.devices,
    selectedApk: state.apkSelector.selectedApk,
    installFlag: state.installCheckbox
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDevices: () => {
      dispatch(getDevices());
    },
    runFeatures: (device, selectedApk, installFlag) => {
      if (!device.lock) { // Only run unlocked device
        if (device.feature) { // Run the feature
          dispatch(onChangeDeviceLock(device));
          dispatch(runFeatures(device, selectedApk, installFlag));
        } else { // Empty the device feature in database
          dispatch(onEmptyDeviceFeature(device));
        }
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiButtons);