import React from 'react'
import { AppContext } from "../../context/context";
import { UserTypes } from '../../reducers/reducers';
import { useAuth } from "../../hooks/authHook";
import { useNavigate } from 'react-router-dom';

const HomePage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = ()=>{
    dispatch({
      accountDispatch :{
        type : UserTypes.UPDATE,
        payload : {
          name : "Giovanni",
          surname : "Pacelli"
        }
      }
    })
  }

  const handleLogout = async ()=>{
    let res = await logout();

    if (res) {
      navigate('/login');
    }
  }

  return (
    <div>
      HomePage works
      <br />
      <span>Utente: {state.account.name + " " + state.account.surname}</span>
      <br />
      <button onClick={()=>{handleClick()}}>Cambia nome</button>
      <button onClick={()=>{handleLogout()}}>Logout</button>
    </div>
  )
}

export default HomePage
