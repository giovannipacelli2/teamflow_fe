import React, { createContext, useReducer, Dispatch, Reducer, useState } from "react";
import {
    accountReducer,
    accountActions,
    authReducer,
    authActions,
} from '../reducers/reducers';

import { AccountResponse, AccountsUsernames, Auth } from "../api";
import { Location } from "react-router-dom";

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
    prevRoute: Location;
    setUsernames : React.Dispatch<React.SetStateAction<AccountsUsernames[]>>;
    setIsLoadingApp : React.Dispatch<React.SetStateAction<boolean>>;
    setPrevRoute : React.Dispatch<React.SetStateAction<Location>>;
    }>({
      authState: initialAuthState,
      accountState: initialAccountState,
      authDispatch: () => null,
      accountDispatch: () => null,
      usernames : [],
      setUsernames: ()=>{},
      isLoadingApp : false,
      setIsLoadingApp: ()=>{},
      prevRoute: { pathname: "", search: "", hash: "", state: "", key: ""},
      setPrevRoute: ()=>{},
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
    const [prevRoute, setPrevRoute] = useState<Location>({pathname: "", search: "", hash: "", state: "", key: ""});

  return (
    <AppContext.Provider value={{ authState, authDispatch, accountState, accountDispatch, usernames, setUsernames, isLoadingApp, setIsLoadingApp, prevRoute, setPrevRoute }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };