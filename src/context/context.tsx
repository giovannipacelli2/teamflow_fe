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

export interface InitialStateType {
    auth : Auth,
    account : AccountResponse,
};

export interface reducerActions {
    authDispatch ?: authActions,
    accountDispatch ?: accountActions,
};
  
const initialState : InitialStateType = {
  auth: {
    status : "",
    accountId : "",
    authorization : {
      token: "",
      type: ""
    }
  },
  account : {
    id: "",
    username: "",
    name: "",
    surname: "",
    email: ""
  },
};

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<reducerActions>;
    }>({
        state: initialState,
        dispatch: () => null,
    });

const mainReducer = (
    state : InitialStateType,
    dispatchObj : reducerActions,
  ) => {
        if (dispatchObj.authDispatch){
            return {
                ...state,
                auth : authReducer(state.auth, dispatchObj.authDispatch)
            }
        }
        if (dispatchObj.accountDispatch){
            return {
                ...state,
                account : accountReducer(state.account, dispatchObj.accountDispatch)
            }
        }
        return state
    };

const AppProvider = ( {children}: AppProviderProps ) => {
    const [state, dispatch] = useReducer<Reducer<InitialStateType, reducerActions>>(
        mainReducer, 
        initialState
    );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };