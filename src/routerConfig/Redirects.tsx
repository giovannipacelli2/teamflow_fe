import React from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectsProps {
    isAuth : boolean;
    redirectTrue ?: string;
    redirectFalse ?: string;
}

const Redirects : React.FC<RedirectsProps> = ({
    isAuth,
    redirectTrue = '/dashboard/home',
    redirectFalse = '/login'
}) => {
  return (
   isAuth ? <Navigate to={redirectTrue} replace/> : <Navigate to={redirectFalse} replace/>
  )
}

export default Redirects
