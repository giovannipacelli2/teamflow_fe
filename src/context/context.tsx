import React, { createContext, useReducer, Dispatch, Reducer, useEffect, useState } from "react";
import {
    accountReducer,
    accountActions,
    authReducer,
    authActions,
} from '../reducers/reducers';

import { AccountResponse, AccountsUsernames, Auth, GetAllUsernames200Response } from "../api";

interface AppProviderProps {
    children: React.ReactNode;
  }

export interface initialAuthStateI extends Auth{} 
export interface initialAccountStateI extends AccountResponse{} 
  
const initialAuthState : initialAuthStateI = {
  status : "",
  accountId : "",
  authorization : {
    token: "",
    type: ""
  }

};
const initialAccountState : initialAccountStateI = {
  id: "",
  username: "",
  name: "",
  surname: "",
  email: ""
};

const AppContext = createContext<{
    authState: initialAuthStateI;
    accountState: initialAccountStateI;
    authDispatch: Dispatch<authActions>;
    accountDispatch: Dispatch<accountActions>;
    usernames: AccountsUsernames[];
    isLoadingApp: boolean;
    setUsernames : React.Dispatch<React.SetStateAction<AccountsUsernames[]>>;
    setIsLoadingApp : React.Dispatch<React.SetStateAction<boolean>>;
    }>({
      authState: initialAuthState,
      accountState: initialAccountState,
      authDispatch: () => null,
      accountDispatch: () => null,
      usernames : [],
      setUsernames: ()=>{},
      isLoadingApp : false,
      setIsLoadingApp: ()=>{}
    });


const AppProvider = ( {children}: AppProviderProps ) => {
    const [authState, authDispatch] = useReducer<Reducer<initialAuthStateI, authActions>>(
        authReducer, 
        initialAuthState
    );
    const [accountState, accountDispatch] = useReducer<Reducer<initialAccountStateI, accountActions>>(
        accountReducer, 
        initialAccountState
    );

    const [usernames, setUsernames] = useState<AccountsUsernames[]>([]);
    const [isLoadingApp, setIsLoadingApp] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ authState, authDispatch, accountState, accountDispatch, usernames, setUsernames, isLoadingApp, setIsLoadingApp }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };