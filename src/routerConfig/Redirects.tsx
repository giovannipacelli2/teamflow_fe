import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from './routes';

interface RedirectsProps {
    isAuth : boolean;
    redirectTrue ?: string;
    redirectFalse ?: string;
}

const Redirects : React.FC<RedirectsProps> = ({
    isAuth,
    redirectTrue = Routes.MY_TODOS,
    redirectFalse = Routes.LOGIN,
}) => {
  return (
   isAuth ? <Navigate to={redirectTrue} replace/> : <Navigate to={redirectFalse} replace/>
  )
}

export default Redirects
