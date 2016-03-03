import { GET_FEATURE_OPTIONS, ADD_NEW_FEATURE, REMOVE_FEATURE } from '../actions/index';

const featureOptions = (state = [], action) => {
  switch (action.type) {
    case GET_FEATURE_OPTIONS:
      return action.payload.data;
    case ADD_NEW_FEATURE:
      const newFeature = action.payload.data;
      let isUpdate = false;

      // If it's update, replace the updated feature and set isUpdate true
      const modifiedState = state.map(f => {
        if (f.value === newFeature.value) {
          isUpdate = true;
          return newFeature;
        } else {
          return f;
        }
      });

      // If it's not update, concat the new feature to the state
      return isUpdate ? modifiedState : modifiedState.concat(newFeature);
    case REMOVE_FEATURE:
      const removedFeature = action.payload.data;
      return state.filter(f => {        
        return f.value !== removedFeature.value;
      });
    default:
      return state;
  }
}

export default featureOptions;