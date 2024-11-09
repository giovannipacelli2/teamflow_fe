import React from 'react'
import { Auth, AuthApi, Logged, LoginRequest } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { AppContext } from '../context/context';
import { AuthTypes, UserTypes } from '../reducers/reducers';
import useCookie from "../hooks/useCookie"
import { cookiesName } from '../enums/cookies';

export interface loginBodyI extends LoginRequest {
    remember : boolean
};

export const useAuth = () => {

    const { dispatch } = React.useContext(AppContext);
    const { setCookie, setSessionCookie, deleteCookie } = useCookie();

    const logged = async ()=>{
        
        let authReq = new AuthApi();
        
        let res = await authReq.logged();

        let data = res.data as GenericResponse<Logged>;

        if (data.status >= 200 && data.status < 400){
            return true
        } 
        
        return false;
    }

    const login = async (body : loginBodyI) : Promise<boolean> =>{

        const { username, password, remember } = body;

        let b : LoginRequest = {
            username,
            password
        }

        let authReq = new AuthApi();

        let res = await authReq.login(b);

        let data = res.data as GenericResponse<Auth>;

        if (res.status >= 200 && res.status < 400){

            dispatch({
                authDispatch: {
                    type: AuthTypes.UPDATE,
                    payload : data.data
                }
            });

            if (remember){
                setCookie(cookiesName.TOKEN, data.data.authorization?.token ?? "");
                setCookie(cookiesName.AUTH_TYPE, data.data.authorization?.type ?? "");
            } else {
                
                setSessionCookie(cookiesName.TOKEN, data.data.authorization?.token ?? "");
                setSessionCookie(cookiesName.AUTH_TYPE, data.data.authorization?.type ?? "");
            }


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
