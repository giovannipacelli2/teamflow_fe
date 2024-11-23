import React, {useContext} from 'react'
import { TodoApi, TodoResponse, TodosResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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

    return { getAllTodos, getAllSharedTodos };
}