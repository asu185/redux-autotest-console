import React from 'react';
import { connect } from 'react-redux';
import { 
  onChangeApk, 
  getApkList, 
  getApkListBefore, 
  resignApk, 
  resignApkBefore  
} from '../actions/index';
import FileUploadProgress  from 'react-fileupload-progress';
import { ip } from '../../../config';

const toggleRotating = (isLoading) => {
  if (isLoading) {
    return ' glyphicon-refresh rotating'
  } else {
    return '';
  }
}

const formGetter = () => {
  return new FormData(document.getElementById('uploadForm'));
}

const customFormRenderer = (onSubmit) => {
  return (
    <form id="uploadForm"
      encType="multipart/form-data"
      action="/api/upload-apk"
      method="post" >
      <div className="fileinput fileinput-new" data-provides="fileinput">          
        <span className="btn btn-default btn-file">
          <span className="fileinput-new">Select APK to upload</span>
          <span className="fileinput-exists fileinput-filename">Select APK to upload</span>
          <input type="file" name="file" />
        </span>
        <button className="btn btn-primary" type="button" onClick={onSubmit} >
          Upload
        </button>
      </div>
    </form>
  )
}

const ApkSelector = (props) => {
  // console.log('Render apk-selector');
  const url = `${ip}/api/upload-apk`;
  return (    
    <div id="ApkSelector">
      <FileUploadProgress key='ex1' url={url}
        onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
        onLoad={ (e, request) => {console.log('load', e, request);}}
        onError={ (e, request) => {console.log('error', e, request);}}
        onAbort={ (e, request) => {console.log('abort', e, request);}}
        formGetter={formGetter}
        formRenderer={customFormRenderer} />

      <span>Select APK to run: </span>
      <select onChange={props.onChangeApk}>
        {props.apkSelector.apks.map(function(apk) {
          return <option key={apk} value={apk}>{apk}</option>
        })}
      </select>
      <a title={'Refresh the APK list'} className={'glyphicon glyphicon-repeat' + toggleRotating(props.apkSelector.isLoadingApkList)}
        onClick={props.getApkList}>        
      </a>
      <a title={'Resign the selected APK'} className={'glyphicon glyphicon-pencil' + toggleRotating(props.apkSelector.isResigning)}
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