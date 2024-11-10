import React, {useContext} from 'react'
import { TodoApi, TodoResponse, TodosResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';
import { AppContext } from '../context/context';

export default function useTodos() {

    const { dispatch } = useContext(AppContext);

    const getAllTodos = async () : Promise<TodoResponse[]> => {
        let todoApi = new TodoApi();
        
        let res = await todoApi.getAllTodos();

        let data = res.data as GenericResponse<TodosResponse>;

        if (data.status >= 200 && data.status < 400){

            if (data.data.data){
                return data.data.data;
            }
        } 
        
        return [];
    };

    return { getAllTodos };
}