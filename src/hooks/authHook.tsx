import {useContext} from 'react'
import { Auth, AuthApi, Logged, LoginRequest } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { AppContext } from '../context/context';
import { AuthTypes, UserTypes } from '../reducers/reducers';
import useCookie from "../hooks/useCookie"
import { cookiesName } from '../enums/cookies';
import useCrypto from './useCrypto';

export interface loginBodyI extends LoginRequest {
    remember : boolean
};

export const useAuth = () => {

    const { authDispatch, accountDispatch, setPrevRoute } = useContext(AppContext);
    const { setCookie, setSessionCookie, deleteCookie } = useCookie();
    const { encryptString } = useCrypto();

    const logged = async ()=>{
        
        let authReq = new AuthApi();
        
        let res = await authReq.logged();

        let data = res.data as GenericResponse<Logged>;

        if (data.status >= 200 && data.status < 400){

            authDispatch({
                type: AuthTypes.UPDATE,
                payload : {
                    accountId : data.data.account?.id,
                    status: "success"
                }
              });

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

            authDispatch({
                type: AuthTypes.UPDATE,
                payload : data.data
            });

            let token = data.data.authorization?.token ?? "";
            let tType = data.data.authorization?.type ?? "";

            let encryptedToken = encryptString(token);
            let encryptedTokenType = encryptString(tType);

            if (remember){
                setCookie(cookiesName.TOKEN, encryptedToken);
                setCookie(cookiesName.AUTH_TYPE, encryptedTokenType);
            } else {
                
                setSessionCookie(cookiesName.TOKEN, encryptedToken);
                setSessionCookie(cookiesName.AUTH_TYPE, encryptedTokenType);
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

            destroySession();

            return true;
        }
        return false
    }

    const destroySession = ()=>{
        authDispatch({
            type: AuthTypes.RESET
        });

        accountDispatch({
            type: UserTypes.RESET
        });

        setPrevRoute({pathname: "", search: "", hash: "", state: "", key: ""});

        deleteCookie(cookiesName.TOKEN);
        deleteCookie(cookiesName.AUTH_TYPE);
    }

  return {logged, login, logout, destroySession}
}

export default useAuth
