import React, { useContext, useEffect } from 'react'
import { AppContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routerConfig/routes';
import useLoading from '../../hooks/useLoading';
import { AlertContext } from '../../context/alertContext';
import AlertComponent from '../../components/Alert/Alert';

const RootPage : React.FC = () => {

  const { alertElem, alertType, closeAlert } = useContext(AlertContext)
  const { authState } = useContext(AppContext);
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
    <>
     <AlertComponent
        activated={alertElem}
        onClose={closeAlert}
        duration={2500}
        title={alertType.title}
        subtitle={alertType.subtitle}
        type={alertType.type}
      >
      </AlertComponent>
      {LoadingElem}
    </>
  )
}

export default RootPage
