import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 3000,
  responseType: 'json',
  headers: { APP_SECRET: process.env.REACT_APP_APP_SECRET || '' },
});

const requestHandler = (request) => {
  if (request.hasOwnProperty('pushToken') && request.pushToken) {
    request.headers.Authorization = `Bearer ${request.pushToken}`;
  }
  return request;
};

const errorHandler = (error) => {
  console.log(error);
  return {
    success: false,
    message: 'Unexpected error from server',
    status: 500,
    errorType: 'server',
    payload: {},
  };
};

instance.interceptors.request.use(
  (config) => requestHandler(config),
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => errorHandler(error),
);

export default instance;
