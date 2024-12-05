import React, {useContext} from 'react'
import { TodoApi, TodoBodyReq, TodoResponse, TodosResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTodoI } from '../interfaces/TodosInterfaces';

export default function useTodos() {

    const queryClient = useQueryClient()
    
    const getAllTodos = useQuery({
        queryKey: ['todos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllTodos()
        }
      })
    const getAllSharedTodos = useQuery({
        queryKey: ['sharedTodos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllSharedTodos()
        }
      })

    const updateTodo = useMutation({
      mutationFn: (bodyReq:updateTodoI) => {
        let todoApi = new TodoApi();

        const {todoId, body} = bodyReq;
        return todoApi.updateTodo(todoId, body);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
      }
    })

    return { getAllTodos, getAllSharedTodos, updateTodo };
}