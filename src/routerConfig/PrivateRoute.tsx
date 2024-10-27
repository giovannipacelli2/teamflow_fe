import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuth : boolean;
    redirectPath ?: string;
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({
    isAuth, redirectPath = '/login'
}) => {
  return (
   isAuth ? <Outlet/> : <Navigate to={redirectPath} replace/>
  )
}

export default PrivateRoute
