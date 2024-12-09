import React, {useContext, useEffect} from 'react'
import { AccountApi, AccountResponse, AccountsUsernames, GetAllUsernames200Response } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';
import { AppContext } from '../context/context';
import { UserTypes } from '../reducers/reducers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AllAccountsUsernamesI } from '../interfaces/AllRequests';

export default function useAccount() {

    const { authState, accountDispatch, setUsernames } = useContext(AppContext);

    //const queryClient = useQueryClient()

    const getOwnAccount = async () => {
        let accountApi = new AccountApi();

        let accountId = String(authState.accountId);

        if (!accountId) {
            console.log("[WARNING]:", "Get own account fail!");
            return;
        }
        
        let res = await accountApi.getAccount(accountId);

        let data = res.data as GenericResponse<AccountResponse>;

        if (data.status >= 200 && data.status < 400){

            accountDispatch({
                type: UserTypes.UPDATE,
                payload:{
                    ...data.data
                }
            });

            return true
        } 
        
        return false;
    };

    const getUsernames = async () : Promise<boolean> => {
        let accountApi = new AccountApi();
        
        let res = await accountApi.getAllUsernames();

        if (!res.status) return false;

        if (res.status >= 200 && res.status < 400){
            
            let r = res.data.data as GetAllUsernames200Response;

            r.data && setUsernames(r.data);
            return true
        } 
        
        return false;
    };

    return { getOwnAccount, getUsernames };
}