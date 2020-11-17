import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import predictorDataReducer from './PredictorDataReducer';
const AppReducers = combineReducers({
  auth: authReducer,
  predictorData: predictorDataReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

export default rootReducer;
