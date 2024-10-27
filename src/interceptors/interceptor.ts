import axios, { InternalAxiosRequestConfig } from 'axios';

const interceptor = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config : InternalAxiosRequestConfig) {
      
      let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI5OTU0NzE3LCJleHAiOjE3MzA1NTk1MTcsIm5iZiI6MTcyOTk1NDcxNywianRpIjoiaUdmczdzSmx2Zk9HYTdVUiIsInN1YiI6ImFlNjgyODNmLWRhOTMtNGYzMi1iODdmLTU1YjZjNjJjYmNlNiIsInBydiI6ImM4ZWUxZmM4OWU3NzVlYzRjNzM4NjY3ZTViZTE3YTU5MGI2ZDQwZmMiLCJyb2xlIjpudWxsfQ.ppWT45fjXsVkVPZuzyuVvRVzPfF_eTrcHiMcoOoDeM0";
      //token = "";
      
      config.headers.Authorization = 'Bearer ' + token;

      return config;
    },
    function (error) {

      return Promise.reject(error);
    }
  );
};

export default interceptor;
