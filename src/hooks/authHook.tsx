import React from 'react'
import { Auth, AuthApi, Logged, LoginRequest } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { AppContext } from '../context/context';
import { AuthTypes, UserTypes } from '../reducers/reducers';
import useCookie from "../hooks/useCookie"
import { cookiesName } from '../enums/cookies';

export const useAuth = () => {

    const { state ,dispatch } = React.useContext(AppContext);
    const { setCookie, deleteCookie } = useCookie();

    const logged = async ()=>{
        
        let authReq = new AuthApi();
        
        let res = await authReq.logged();

        let data = res.data as GenericResponse<Logged>;

        if (data.status >= 200 && data.status < 400){
            return true
        } 
        
        return false;
    }

    const login = async (body : LoginRequest) : Promise<boolean> =>{
        let authReq = new AuthApi();

        let res = await authReq.login(body);

        let data = res.data as GenericResponse<Auth>;

        if (res.status >= 200 && res.status < 400){

            dispatch({
                authDispatch: {
                    type: AuthTypes.UPDATE,
                    payload : data.data
                }
            });

            setCookie(cookiesName.TOKEN, data.data.authorization?.token ?? "");
            setCookie(cookiesName.AUTH_TYPE, data.data.authorization?.type ?? "");

            return true;
        }
        return false;
    }

    const logout = async () : Promise<boolean> =>{
        let authReq = new AuthApi();

        let res = await authReq.logout();
        let data = res.data as GenericResponse<unknown>;

        if (data.status >= 200 && data.status < 400){

            dispatch({
                authDispatch: {
                    type: AuthTypes.RESET
                },
                accountDispatch: {
                    type: UserTypes.RESET
                }
            });

            deleteCookie(cookiesName.TOKEN);
            deleteCookie(cookiesName.AUTH_TYPE);

            return true;
        }
        return false
    }

  return {logged, login, logout}
}

export default useAuth
