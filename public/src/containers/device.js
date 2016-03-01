import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { onChangeDeviceFeature, setDeviceRunning } from '../actions/index';

const Device = ({ 
  device, 
  featureOptions, 
  onChangeDeviceFeature,
  onChangeIsRunning
}) => {
  // console.log('Render device');
  return (
    <tr>
      <td>{device.name}</td>
      <td>
        {'Unlock '}
        <input 
          type="checkbox"
          checked={device.isRunning}
          onChange={onChangeIsRunning} />          
      </td>
      <td>
        <Select
          name="form-field-name"
          value={device.feature}
          disabled={device.isRunning}
          options={featureOptions}
          onChange={onChangeDeviceFeature} />
      </td>
    </tr>
  )
}

function mapStateToProps(state) {
  return {
    featureOptions: state.featureOptions
  }
}

function mapDispatchToProps(dispatch, ownProps) {  
  return {
    onChangeDeviceFeature: (feature) => {
      dispatch(onChangeDeviceFeature(ownProps.device.name, feature));
    },
    onChangeIsRunning: () => {
      dispatch(setDeviceRunning(ownProps.device, false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);