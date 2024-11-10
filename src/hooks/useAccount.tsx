import React, {useContext} from 'react'
import { AccountApi, AccountResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';
import { AppContext } from '../context/context';
import { UserTypes } from '../reducers/reducers';

export default function useAccount() {

    const { state, dispatch } = useContext(AppContext);

    const getOwnAccount = async () => {
        let accountApi = new AccountApi();

        let accountId = String(state.auth.accountId);

        if (!accountId) {
            console.log("[WARNING]:", "Get own account fail!");
            return;
        }
        
        let res = await accountApi.getAccount(accountId);

        let data = res.data as GenericResponse<AccountResponse>;

        if (data.status >= 200 && data.status < 400){

            dispatch({
                accountDispatch:{
                    type: UserTypes.UPDATE,
                    payload:{
                        ...data.data
                    }
                }
            });

            return true
        } 
        
        return false;
    };

    return { getOwnAccount };
}