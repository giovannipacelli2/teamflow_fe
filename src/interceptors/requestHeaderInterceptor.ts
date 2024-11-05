import axios, { InternalAxiosRequestConfig } from 'axios';
import { Auth } from '../api';

export const requestHeaderInterceptor = (auth : Auth) => {
  // Add a request interceptor
  
  return axios.interceptors.request.use(
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

export const removeHeaderInterceptor = (interceptor : number) =>{
  axios.interceptors.request.eject(interceptor);
}
