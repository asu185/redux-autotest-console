import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { onChangeDeviceFeature, onChangeDeviceLock } from '../actions/index';

const Device = ({ 
  device, 
  featureOptions, 
  onChangeDeviceFeature,
  onChangeDeviceLock
}) => {
  // console.log('Render device');
  return (
    <tr>
      <td>{device.name}</td>
      <td>
        {'Lock '}
        <input 
          type="checkbox"
          checked={device.lock}
          onChange={onChangeDeviceLock} />          
      </td>
      <td>
        <Select
          name="form-field-name"
          value={device.feature}
          disabled={device.lock}
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
    onChangeDeviceLock: () => {
      dispatch(onChangeDeviceLock(ownProps.device));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);