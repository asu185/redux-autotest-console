import React from 'react'
import { connect } from 'react-redux';
import { 
  getFeatureOptions, 
  getDevices, 
  runFeatures, 
  setDeviceRunning 
} from '../actions/index';

const ApiButtons = ({ 
  devices,
  selectedApk,
  installFlag,
  getFeatureOptions,
  getDevices,
  runFeatures 
}) => {  
  // console.log('Render api-buttons');
  return (
    <div>
      <div className="btn-group pull-right" role="group" aria-label="...">
        <a className="btn btn-default" onClick={getDevices}>
          <span className="glyphicon glyphicon-repeat"></span>
          SyncDevices
        </a>
        <a className="btn btn-default" onClick={getFeatureOptions}>
          <span className="glyphicon glyphicon-list-alt"></span>
          Features
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
    getFeatureOptions: () => {
      dispatch(getFeatureOptions());
    },
    getDevices: () => {
      dispatch(getDevices());
    },
    runFeatures: (device, selectedApk, installFlag) => {
      dispatch(setDeviceRunning(device));
      dispatch(runFeatures(device, selectedApk, installFlag));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiButtons);