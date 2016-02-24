import { GET_DEVICES, CHANGE_DEVICE_FEATURE } from '../actions/index'

const device = (state, action) => {
  switch (action.type) {
    case CHANGE_DEVICE_FEATURE:
      if (state.name !== action.payload.name) {
        return state;
      }
      return Object.assign({}, state, {
        feature: action.payload.feature
      })
    default:
      return state;
  }
}

const devices = (state = [], action) => {
  switch (action.type) {
    case GET_DEVICES:
      return action.payload.data;
    case CHANGE_DEVICE_FEATURE:
      return state.map(d => 
        device(d, action)
      )
    default:
      return state;
  }
}

export default devices;
