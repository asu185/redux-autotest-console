import axios from 'axios';
import { ip } from '../../../config';
const ROOT_URL = `${ip}/api/`;

// Client actions
export const CHANGE_DEVICE_FEATURE = 'CHANGE_DEVICE_FEATURE';
export const CHANGE_APK = 'CHANGE_APK';
export const GET_APK_LIST_BEFORE = 'GET_APK_LIST_BEFORE';
export const RESIGN_APK_BEFORE = 'RESIGN_APK_BEFORE';
export const CHANGE_INSTALL_FLAG = 'CHANGE_INSTALL_FLAG';
export const CHANGE_DEVICE_LOCK = 'CHANGE_DEVICE_LOCK';
export const CHANGE_EMAILS = 'CHANGE_EMAILS';

// Server actions
export const GET_APK_LIST = 'GET_APK_LIST';
export const RESIGN_APK = 'RESIGN_APK';

export const GET_DEVICES = 'GET_DEVICES';
export const RUN_FEATURE = 'RUN_FEATURE';

export const EMPTY_DEVICE_FEATURE = 'EMPTY_DEVICE_FEATURE';
export const GET_DEVICE_REPORTS = 'GET_DEVICE_REPORTS';
export const DELETE_DEVICE_REPORT = 'DELETE_DEVICE_REPORT';

export const GET_FEATURE_OPTIONS = 'GET_FEATURE_OPTIONS';
export const UPDATE_FEATURE_OPTIONS = 'UPDATE_FEATURE_OPTIONS';

export const GET_EMAIL_OPTIONS = 'GET_EMAIL_OPTIONS';
export const UPDATE_EMAIL_OPTIONS = 'UPDATE_EMAIL_OPTIONS';


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
  const url = ROOT_URL + 'resign-apk';
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

export function runFeatures(data) {  
  const url = ROOT_URL + 'run-test';
  const request = axios.post(url, data);

  return {
    type: RUN_FEATURE,
    payload: request
  }
}

export function onChangeDeviceLock(device) {
  return {
    type: CHANGE_DEVICE_LOCK,
    payload: { device }
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

export function updateFeatureOptions(content) {
  const url = ROOT_URL + 'update-features';
  const request = axios.post(url, { features: content });

  return {
    type: UPDATE_FEATURE_OPTIONS,
    payload: request
  }
}

export function getEmailOptions() {
  const url = ROOT_URL + 'emails';
  const request = axios.get(url);

  return {
    type: GET_EMAIL_OPTIONS,
    payload: request
  };
}

export function updateEmailOptions(content) {
  const url = ROOT_URL + 'update-emails';
  const request = axios.post(url, { emails: content });

  return {
    type: UPDATE_EMAIL_OPTIONS,
    payload: request
  }
}

export function getDeviceReports(device_name) {
  const url = ROOT_URL + 'reports';
  const request = axios.post(url, { device_name });

  return {
    type: GET_DEVICE_REPORTS,
    payload: request
  };
}

export function deleteDeviceReport(device_name, report) {
  const url = ROOT_URL + 'delete-report';
  const request = axios.post(url, { device_name, report });

  return {
    type: DELETE_DEVICE_REPORT,
    payload: request
  };
}

export function onChangeEmails(emails) {
  return {
    type: CHANGE_EMAILS,
    payload: emails
  }
}