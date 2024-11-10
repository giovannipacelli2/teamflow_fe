import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { BaseRoutes } from './routes';

interface PrivateRouteProps {
    isAuth : boolean;
    redirectPath ?: string;
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({
    isAuth, redirectPath = BaseRoutes.LOGIN
}) => {
  return (
   isAuth ? <Outlet/> : <Navigate to={redirectPath} replace/>
  )
}

export default PrivateRoute
