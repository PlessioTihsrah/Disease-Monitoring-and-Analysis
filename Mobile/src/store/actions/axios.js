import axios from 'axios';

const createInstance = (token = null) => {
  const baseURL = 'https://realtimehospital.herokuapp.com/';
  if (token) {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios.create({baseURL});
  }
};

export default createInstance;
