import React, {useContext} from 'react'
import { TodoApi, TodoResponse, TodosResponse } from '../api';
import { GenericResponse } from '../interfaces/GenericResponse';
import { AppContext } from '../context/context';
import { TodosTypes } from '../reducers/reducers';

export default function useTodos() {

    const { dispatch } = useContext(AppContext);

    const getAllTodos = async () => {
        let todoApi = new TodoApi();
        
        let res = await todoApi.getAllTodos();

        let data = res.data as GenericResponse<TodosResponse>;

        if (data.status >= 200 && data.status < 400){

            if (data.data.data){
                let todosData : TodoResponse[] = data.data.data;

                dispatch({
                    todosDispatch:{
                        type: TodosTypes.SET,
                        payload:{
                            body: todosData
                        }
                    }
                });
            }

            return true
        } 
        
        return false;
    };

    return { getAllTodos };
}