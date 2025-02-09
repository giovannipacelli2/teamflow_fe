import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from './routes';
import { AppContext } from '../context/context';

interface RedirectsProps {
    isAuth : boolean;
    redirectTrue ?: string;
    redirectFalse ?: string;
}

const Redirects : React.FC<RedirectsProps> = ({
    isAuth,
    redirectTrue = Routes.MY_TASKS,
    redirectFalse = Routes.LOGIN,
}) => {

  const location = useLocation();
  const {setPrevRoute} = useContext(AppContext);

  useEffect(() => {

    setPrevRoute(location);

  }, [location, setPrevRoute]);
  return (
   isAuth ? <Navigate to={redirectTrue} replace/> : <Navigate to={redirectFalse} replace/>
  )
}

export default Redirects
