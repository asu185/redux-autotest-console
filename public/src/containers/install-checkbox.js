import React from 'react';
import { connect } from 'react-redux';
import { onChangeInstallFlag } from '../actions/index';

const InstallCheckbox = ({ installFlag, onChangeInstallFlag }) => {
  // console.log('Render install-checkbox');
  return (
    <div>
      <span>Install/Reinstall apk: </span>
      <input 
        type="checkbox"
        checked={installFlag}
        onChange={onChangeInstallFlag} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    installFlag: state.installCheckbox
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeInstallFlag: () => {
      dispatch(onChangeInstallFlag());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallCheckbox);