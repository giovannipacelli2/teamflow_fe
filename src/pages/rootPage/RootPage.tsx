import React, { useEffect } from 'react'
import { AppContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routerConfig/routes';

const RootPage : React.FC = () => {

  const { state } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if (state.auth.status === ""){
      navigate(Routes.LOGIN);
    }
  }, []);

  useEffect(()=>{
    if (state.auth.status === "success"){
      navigate(Routes.MY_TODOS);
    }
  }, [state.auth.status]);


  return (
    <></>
  )
}

export default RootPage
