import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { BaseRoutes } from './routes';
import { AppContext } from '../context/context';

interface PrivateRouteProps {
    isAuth : boolean;
    redirectPath ?: string;
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({
    isAuth, redirectPath = BaseRoutes.LOGIN
}) => {

  const location = useLocation();
  const {setPrevRoute} = useContext(AppContext);

  useEffect(() => {
    setPrevRoute(location);

  }, [location, setPrevRoute]);


  return (
   isAuth ? <Outlet/> : <Navigate to={redirectPath} replace/>
  )
}

export default PrivateRoute
