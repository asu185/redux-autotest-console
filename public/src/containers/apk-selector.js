import React from 'react';
import { connect } from 'react-redux';
import { 
  onChangeApk, 
  getApkList, 
  getApkListBefore, 
  resignApk, 
  resignApkBefore 
} from '../actions/index';

const toggleRotating = (isLoading) => {
  if (isLoading) {
    return ' glyphicon-refresh rotating'
  } else {
    return '';
  }
}

const ApkSelector = (props) => {
  return (
    <div>
      <span>Select the apk: </span>
      <select onChange={props.onChangeApk}>
        {props.apkSelector.apks.map(function(apk) {
          return <option key={apk} value={apk}>{apk}</option>
        })}
      </select>
      <a className={'glyphicon glyphicon-repeat' + toggleRotating(props.apkSelector.isLoadingApkList)}
        onClick={props.getApkList}>
      </a>
      <a className={'glyphicon glyphicon-pencil' + toggleRotating(props.apkSelector.isResigning)}
        onClick={() => props.resignApk(props.apkSelector.selectedApk)}>
      </a>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    apkSelector: state.apkSelector
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeApk: (event) => {
      dispatch(onChangeApk(event));
    },
    getApkList: () => {
      dispatch(getApkListBefore());
      dispatch(getApkList());
    },
    resignApk: (selectedApk) => {
      dispatch(resignApkBefore());
      dispatch(resignApk(selectedApk));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApkSelector);