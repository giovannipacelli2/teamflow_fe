import React, {useContext} from 'react'
import { TodoApi, TodoBodyReq, TodoResponse, TodosResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodoI, updateTodoI } from '../interfaces/TodosInterfaces';
import { filter, sortBy } from 'lodash';

export default function useTodos() {

    const queryClient = useQueryClient()
    
    const getAllTodos = useQuery({
        queryKey: ['todos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllTodos(50,1,'created_at', 'desc')
        }
      })
    const getAllSharedTodos = useQuery({
        queryKey: ['sharedTodos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllSharedTodos()
        }
      })

    const createTodo = useMutation({
      mutationFn: (bodyReq:TodoBodyReq) => {
        let todoApi = new TodoApi();

        return todoApi.createTodo(bodyReq);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
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

    const deleteTodo = useMutation({
      mutationFn: (bodyReq:deleteTodoI) => {
        let todoApi = new TodoApi();

        const {todoId} = bodyReq;
        return todoApi.deleteTodo(todoId);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
      }
    })

    return { getAllTodos, getAllSharedTodos, createTodo, updateTodo, deleteTodo };
}