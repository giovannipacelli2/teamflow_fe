import React, { useEffect } from 'react'
import { AppContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';

const RootPage : React.FC = () => {

  const { state } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if (state.auth.status === ""){
        navigate('/login');
    }
  }, []);

  useEffect(()=>{
    if (state.auth.status === "success"){
        navigate('/dashboard/home');
    }
  }, [state.auth.status]);


  return (
    <></>
  )
}

export default RootPage
