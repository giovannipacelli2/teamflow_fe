import React, { createContext, useEffect, useState } from "react";
import useTodos from '../hooks/useTodos'

import { GetAllTodos200Response, TodoResponse } from "../api";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface AppProviderProps {
    children: React.ReactNode;
  }

export interface initialTodoStateI {
  myTodos: TodoResponse[],
  sharedTodos : TodoResponse[],
}


  
const initialState : initialTodoStateI = {

  myTodos: [],
  sharedTodos: [],
};

/* const TodosContext = createContext<{
  todoState: initialTodoStateI,
  //getAllTodos : UseQueryResult<AxiosResponse<GetAllTodos200Response, any>, Error>,
  getSharedTodos : ()=>Promise<any>,
    }>({
      todoState: initialState,
      getSharedTodos : async ()=> {},
    }); */
const TodosContext = createContext({
      todoState: initialState,
      todosLoading: false,
      todosError: false,
      getSharedTodos : async ()=> {},
    });


const TodosProvider = ( {children}: AppProviderProps ) => {
    const [todoState, setTodoState] = useState<initialTodoStateI>(initialState);

    const { getAllTodos, getAllSharedTodos } = useTodos();
    const { data:todosData, isLoading:todosLoading, isError:todosError} = getAllTodos;


    useEffect(()=>{

      let res = todosData?.data.data?.data ?? [];

      if (res){
        let state : TodoResponse[] = [...res];

        setTodoState((prevState)=>{
          return {
            ...prevState,
            myTodos : state
          }
        });
      }

    },[todosData]);

    const getSharedTodos = async () =>{
      let res = await getAllSharedTodos();
      setTodoState((prevState)=>{
        return {
          ...prevState,
          sharedTodos : res
        }
      });
    }

  return (
    <TodosContext.Provider value={{ todoState, todosLoading, todosError, getSharedTodos}}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };