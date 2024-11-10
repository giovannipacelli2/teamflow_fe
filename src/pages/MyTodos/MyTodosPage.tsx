import React, {useEffect} from 'react'
import { AppContext } from "../../context/context";
import { TodosTypes, UserTypes } from '../../reducers/reducers';
import { useNavigate } from 'react-router-dom';
import useTodos from '../../hooks/useTodos';

const MyTodosPage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();
  const {getAllTodos} = useTodos();

  /* useEffect(()=>{
    return ()=>{
      dispatch({
        todosDispatch:{
          type: TodosTypes.SET,
          payload:{
            body : []
          }
        }
      });
    };
  }, [dispatch]); */

  useEffect(()=>{
    if (state.todos.length === 0 && state.account.id){
      handleGetTodos();
    }
  }, [state.todos]);

  const handleGetTodos = async ()=>{
    await getAllTodos();
  }

  return (
    <div>
      MyTodosPage works
    </div>
  )
}

export default MyTodosPage
