import React, { useEffect } from 'react'
import { AppContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routerConfig/routes';
import useLoading from '../../hooks/useLoading';

const RootPage : React.FC = () => {

  const { authState } = React.useContext(AppContext);
  const navigate = useNavigate();
  const {LoadingElem} = useLoading()

  useEffect(()=>{
    if (authState.status === ""){
      navigate(Routes.LOGIN);
    }
  }, []);

  useEffect(()=>{
    if (authState.status === "success"){
      navigate(Routes.MY_TODOS);
    }
  }, [authState.status]);


  return (
    <>{LoadingElem}</>
  )
}

export default RootPage
