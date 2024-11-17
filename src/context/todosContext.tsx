import React, { createContext, useState } from "react";
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

const TodosContext = createContext<{
  todoState: initialTodoStateI,
  getTodos : ()=>Promise<any>,
  getSharedTodos : ()=>Promise<any>,
  loading : boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    }>({
      todoState: initialState,
      getTodos : async ()=> {},
      getSharedTodos : async ()=> {},
      loading: false,
      setLoading : ()=> {},
    });


const TodosProvider = ( {children}: AppProviderProps ) => {
    const [todoState, setTodoState] = useState<initialTodoStateI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const { getAllTodos, getAllSharedTodos } = useTodos();

    const getTodos = async () =>{
      let res = await getAllTodos();
      setTodoState((prevState)=>{
        return {
          ...prevState,
          myTodos : res
        }
      });
    }

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
    <TodosContext.Provider value={{ todoState, getTodos, getSharedTodos, loading, setLoading }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };