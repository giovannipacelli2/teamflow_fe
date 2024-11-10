import React from 'react'
import { AppContext } from "../../context/context";
import { UserTypes } from '../../reducers/reducers';
import { useNavigate } from 'react-router-dom';

const MyTodosPage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      MyTodosPage works
    </div>
  )
}

export default MyTodosPage
