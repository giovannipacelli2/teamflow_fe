import React, { createContext, useReducer, Dispatch, Reducer } from "react";
import {
    accountReducer,
    accountActions,
    authReducer,
    authActions,
} from '../reducers/reducers';

import { AccountResponse, Auth } from "../api";

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
    }>({
      authState: initialAuthState,
      accountState: initialAccountState,
      authDispatch: () => null,
      accountDispatch: () => null,
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

  return (
    <AppContext.Provider value={{ authState, authDispatch, accountState, accountDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };