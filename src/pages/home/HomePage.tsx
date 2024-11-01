import React from 'react'
import { AppContext } from "../../context/context";
import { UserTypes } from '../../reducers/reducers';

const HomePage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);

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

  return (
    <div>
      HomePage works
      <br />
      <span>Utente: {state.account.name + " " + state.account.surname}</span>
      <br />
      <button onClick={()=>{handleClick()}}>Cambia nome</button>
    </div>
  )
}

export default HomePage
