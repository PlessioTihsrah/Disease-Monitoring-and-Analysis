import createInstance from './axios';
import * as TYPES from './ACTION_TYPES';

export const logout = () => {
  return {
    type: TYPES.LOGOUT,
  };
};
export const loginDoctor = (email, password) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const res = await axios.post('/login/doctor', {
        email,
        password,
      });
      const data = res.data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.doctor,
            userType: 'doctor',
          },
        });
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const res = await axios.post('/login/user', {
        email,
        password,
      });
      const data = res.data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.user,
            userType: 'user',
          },
        });
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };
};

export const loginHospitalAdmin = (email, password) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const res = await axios.post('/login/hospital-admin', {
        email,
        password,
      });
      const data = res.data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.hospital_admin,
            userType: 'hospitalAdmin',
          },
        });
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };
};

export const loginSuperAdmin = (email, password) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const res = await axios.post('/login/super-admin', {
        email,
        password,
      });
      const data = res.data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.super_admin,
            userType: 'superAdmin',
          },
        });
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };
};

export const signupUser = (email, password, dob, name, mobile) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const data = (
        await axios.post('/signup/user', {
          email,
          password,
          dob,
          name,
          mobile,
        })
      ).data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.user,
            userType: 'user',
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Something went wrong'));
    }
  };
};

export const signupDoctor = (email, password, hospital, name, mobile) => {
  console.log(email, password, name, mobile, hospital);
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const data = (
        await axios.post('/signup/doctor', {
          email,
          password,
          name,
          hospital,
          mobile,
        })
      ).data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.doctor,
            userType: 'doctor',
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Something went wrong'));
    }
  };
};

export const signupHospitalAdmin = (email, password, hospital, name) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const data = (
        await axios.post('/signup/hospital-admin', {
          email,
          password,
          name,
          hospital,
        })
      ).data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.hospital_admin,
            userType: 'hospitalAdmin',
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Something went wrong'));
    }
  };
};

export const signupSuperAdmin = (email, password) => {
  return async (dispatch) => {
    const axios = createInstance();
    try {
      const data = (
        await axios.post('/signup/super-admin', {
          email,
          password,
        })
      ).data;
      if (data.success) {
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            token: data.token,
            user: data.super_admin,
            userType: 'superAdmin',
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Something went wrong'));
    }
  };
};
