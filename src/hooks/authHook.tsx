import React from 'react'
import { Auth, AuthApi, Logged, LoginRequest } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { AppContext } from '../context/context';
import { AuthTypes } from '../reducers/reducers';

export const useAuth = () => {

    const { state ,dispatch } = React.useContext(AppContext);

    const logged = async ()=>{
        console.log('auth', state.auth)
        
        let authReq = new AuthApi();
        
        let res = await authReq.logged();
        console.log('res', res)

        let data = res.data as GenericResponse<Logged>;

        if (data.status >= 200 && data.status < 400){
            return true
        } 
        
        return false;
    }

    const login = async (body : LoginRequest)=>{
        let authReq = new AuthApi();

        let res = await authReq.login(body);

        let data = res.data as GenericResponse<Auth>;

        if (data.status >= 200 && data.status < 400){

            dispatch({
                authDispatch: {
                    type: AuthTypes.UPDATE,
                    payload : data.data
                }
            })
        }
    }

  return {logged, login}
}

export default useAuth
