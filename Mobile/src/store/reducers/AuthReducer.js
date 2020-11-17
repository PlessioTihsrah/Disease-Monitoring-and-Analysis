import * as TYPES from '../actions/ACTION_TYPES';
const DEFAULT_STATE = {
  user: null,
  userType: '',
  token: '',
};
const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOGOUT:
      console.log('Logout');
      return DEFAULT_STATE;
    case TYPES.LOGIN:
      const {user, userType, token} = action.payload;
      return {...state, user, userType, token};
    default:
      return state;
  }
};

export default authReducer;
