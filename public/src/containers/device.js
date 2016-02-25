import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { onChangeDeviceFeature } from '../actions/index';

const Device = ({ 
  device, 
  featureOptions, 
  onChangeDeviceFeature 
}) => {

  return (
    <tr>
      <td>{device.name}</td>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);