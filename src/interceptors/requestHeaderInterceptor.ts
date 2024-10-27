import axios, { InternalAxiosRequestConfig } from 'axios';

const requestHeaderInterceptor = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config : InternalAxiosRequestConfig) {
      
      let token = process.env.REACT_APP_HEADER;
      //token = "";
      
      config.headers.Authorization = 'Bearer ' + token;

      return config;
    },
    function (error) {

      return Promise.reject(error);
    }
  );
};

export default requestHeaderInterceptor;
