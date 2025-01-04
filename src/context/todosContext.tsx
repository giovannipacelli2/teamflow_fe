import React, { createContext, useEffect, useState } from "react";
import useTodos from '../hooks/useTodos'

import { TodoResponse } from "../api";

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

const TodosContext = createContext({
      resetState : ()=>{},
      todoState: initialState,
      todosLoading: false,
      todosError: false,
      sharedTodosLoading: false,
      sharedTodosError: false,
    });


const TodosProvider = ( {children}: AppProviderProps ) => {
    const [todoState, setTodoState] = useState<initialTodoStateI>(initialState);

    const { getAllTodos, getAllSharedTodos } = useTodos();
    const { data:todosData, isLoading:todosLoading, isError:todosError} = getAllTodos;
    const { data:sharedTodosData, isLoading:sharedTodosLoading, isError:sharedTodosError} = getAllSharedTodos;

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

    useEffect(()=>{

      let res = sharedTodosData?.data.data?.data ?? [];

      if (res){
        let state : TodoResponse[] = [...res];

        setTodoState((prevState)=>{
          return {
            ...prevState,
            sharedTodos : state
          }
        });
      }
    },[sharedTodosData]);

    const resetState = ()=>{
      setTodoState(initialState);
    }


  return (
    <TodosContext.Provider value={{ resetState, todoState, todosLoading, todosError, sharedTodosLoading, sharedTodosError}}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };