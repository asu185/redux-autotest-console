import axios from 'axios';

const ROOT_URL = 'http://localhost:8888/api/';

export const GET_DEVICES = 'GET_DEVICES';
export const GET_FEATURE_OPTIONS = 'GET_FEATURE_OPTIONS';
export const CHANGE_DEVICE_FEATURE = 'CHANGE_DEVICE_FEATURE';
export const CHANGE_APK = 'CHANGE_APK';
export const GET_APK_LIST = 'GET_APK_LIST';
export const GET_APK_LIST_BEFORE = 'GET_APK_LIST_BEFORE';
export const RESIGN_APK = 'RESIGN_APK';
export const RESIGN_APK_BEFORE = 'RESIGN_APK_BEFORE';
export const CHANGE_INSTALL_FLAG = 'CHANGE_INSTALL_FLAG';
export const RUN_FEATURE = 'RUN_FEATURE';
export const SET_DEVICE_RUNNING = 'SET_DEVICE_RUNNING';
export const EMPTY_DEVICE_FEATURE = 'EMPTY_DEVICE_FEATURE';

export function getDevices() {
  const url = ROOT_URL + 'devices';
  const request = axios.get(url);
  
  return {
    type: GET_DEVICES,
    payload: request
  };
}

export function getFeatureOptions() {
  const url = ROOT_URL + 'features';
  const request = axios.get(url);

  return {
    type: GET_FEATURE_OPTIONS,
    payload: request
  };
}

export function onChangeDeviceFeature(name, feature) {
  return {
    type: CHANGE_DEVICE_FEATURE,
    payload: { name, feature }
  }
}

export function onChangeApk(event) {
  return {
    type: CHANGE_APK,
    payload: event.target.value
  }
}

export function getApkListBefore() {
  return {
    type: GET_APK_LIST_BEFORE
  }
}

export function getApkList() {
  const url = ROOT_URL + 'apk-list';
  const request = axios.get(url);

  return {
    type: GET_APK_LIST,
    payload: request
  }
}

export function resignApkBefore() {  
  return {
    type: RESIGN_APK_BEFORE
  }
}

export function resignApk(selectedApk) {
  const url = ROOT_URL + 'resign';
  const request = axios.post(url, { selectedApk });

  return {
    type: RESIGN_APK,
    payload: request
  }
}

export function onChangeInstallFlag() {
  return {
    type: CHANGE_INSTALL_FLAG
  }
}

export function runFeatures(device, selectedApk, installFlag) {  
  const url = ROOT_URL + 'run';
  const data = { device, selectedApk, installFlag };
  const request = axios.post(url, data);

  return {
    type: RUN_FEATURE,
    payload: request
  }
}

export function setDeviceRunning(device, status) {
  return {
    type: SET_DEVICE_RUNNING,
    payload: { device, status }
  }
}

export function onEmptyDeviceFeature(device) {
  const url = ROOT_URL + 'empty-device-feature';
  const request = axios.post(url, { device });

  return {
    type: EMPTY_DEVICE_FEATURE,
    payload: request
  }
}