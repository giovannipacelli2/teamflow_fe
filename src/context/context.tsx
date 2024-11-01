import React, { createContext, useReducer, Dispatch, Reducer } from "react";
import {
    accountReducer,
    accountActions,
    todosReducer,
    todosActions,
    sharedTodosReducer,
    sharedTodosActions
} from '../reducers/reducers';

import { AccountResponse, TodoResponse } from "../api";

interface AppProviderProps {
    children: React.ReactNode;
  }

export interface InitialStateType {
    account : AccountResponse,
    todos : TodoResponse[],
    sharedTodos : TodoResponse[]
};

export interface reducerActions {
    accountDispatch ?: accountActions,
    todosDispatch ?: todosActions,
    sharedTodosDispatch ?: sharedTodosActions
};
  
const initialState : InitialStateType = {
  account : {
    id: "",
    username: "",
    name: "",
    surname: "",
    email: ""
  },
  todos : [],
  sharedTodos : []
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
        if (dispatchObj.accountDispatch){
            return {
                ...state,
                account : accountReducer(state.account, dispatchObj.accountDispatch)
            }
        }
        if (dispatchObj.todosDispatch){
            return {
                ...state,
                todos: todosReducer(state.todos, dispatchObj.todosDispatch)
            }
        }
        if (dispatchObj.sharedTodosDispatch){
            return {
                ...state,
                sharedTodos: sharedTodosReducer(state.sharedTodos, dispatchObj.sharedTodosDispatch)
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