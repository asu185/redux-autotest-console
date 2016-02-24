import axios from 'axios';

const ROOT_URL = 'http://localhost:8888/api/';;

export const GET_DEVICES = 'GET_DEVICES';
export const GET_FEATURE_OPTIONS = 'GET_FEATURE_OPTIONS';
export const CHANGE_DEVICE_FEATURE = 'CHANGE_DEVICE_FEATURE';

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

export function changeDeviceFeature(name, feature) {
  return {
    type: CHANGE_DEVICE_FEATURE,
    payload: { name, feature }
  }
}