import { 
  CHANGE_APK, 
  GET_APK_LIST, 
  GET_APK_LIST_BEFORE, 
  RESIGN_APK, 
  RESIGN_APK_BEFORE 
} from '../actions/index'

const apkSelector = (state = {
    apks: [],
    selectedApk: '',
    isLoadingApkList: false,
    isResigning: false
  }, action) => {
   
  switch(action.type) {
    case CHANGE_APK:      
      let selectedApk = action.payload;
      return Object.assign({}, state, {
        selectedApk
      });
    case GET_APK_LIST_BEFORE:
      return Object.assign({}, state, {
        isLoadingApkList: true
      });
    case GET_APK_LIST:
      let apks = action.payload.data;
      return Object.assign({}, state, {
        selectedApk: apks[0],
        isLoadingApkList: false,
        apks
      });
    case RESIGN_APK_BEFORE:
      return Object.assign({}, state, {
        isResigning: true
      });
    case RESIGN_APK:
      return Object.assign({}, state, {
        isResigning: false
      });    
    default:
      return state;
  }
}

export default apkSelector;