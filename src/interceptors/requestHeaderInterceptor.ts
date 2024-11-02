import axios, { InternalAxiosRequestConfig } from 'axios';
import { Auth } from '../api';

const requestHeaderInterceptor = (auth : Auth) => {
  // Add a request interceptor
  
  axios.interceptors.request.use(
    function (config : InternalAxiosRequestConfig) {
      

      //let token = process.env.REACT_APP_HEADER;
      let token = auth.authorization?.token;
      let authType = auth.authorization?.type;
      
      config.headers.Authorization = authType + ' ' + token;

      return config;
    },
    function (error) {

      return Promise.reject(error);
    }
  );
};

export default requestHeaderInterceptor;
