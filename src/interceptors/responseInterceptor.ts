import axios from 'axios';
import { httpProcessedResponseType } from '../interfaces/GenericResponse';


const responseInterceptor = (callback : ()=>void) => {
  // Add a request interceptor
  axios.interceptors.response.use(
    function (response) {

      if (response.data?.status === 401){
        callback();
        return response
      }
      if (response.data?.status === 500){
        return response
      }
      
      let res : httpProcessedResponseType = {
        data : response.data.data,
        message: response.data.message,
        status : Number(response.status)
      };
      
      return {
        ...response,
        data : res
      };
    },
    function (error) {

      let res : httpProcessedResponseType;
      
      if (error.response){
        res = {
          data : error.response.data.data,
          message: error.response.data.message,
          status : Number(error.status)
        };
        
      } else {

        res = {
          data : [],
          message: error.message,
          status : 500
        };
      }
      
      
      return {
        ...error,
        data : res
      };

    }
  );
};

export default responseInterceptor;
