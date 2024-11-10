import React, {useEffect, useState} from 'react'
import { AppContext } from "../../context/context";
import { UserTypes } from '../../reducers/reducers';
import { useNavigate } from 'react-router-dom';
import useTodos from '../../hooks/useTodos';
import { TodoResponse } from '../../api';

const MyTodosPage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();
  const {getAllTodos} = useTodos();
  const [todos, setTodos] = useState<TodoResponse[]>([]);

  useEffect(()=>{
    if (state.account.id){
      handleGetTodos();
    }
  }, [state.account]);

  useEffect(()=>{
    if (todos.length>0){
      console.log('[DEBUG]: todo_state', todos)
    }
  }, [todos]);

  const handleGetTodos = async ()=>{
    let res = await getAllTodos();
    setTodos(res);
  }

  return (
    <div>
      MyTodosPage works
    </div>
  )
}

export default MyTodosPage
