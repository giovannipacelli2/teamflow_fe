import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import { AppContext } from './context/context';
import { useAuth } from './hooks/authHook'
import useCookie from './hooks/useCookie';

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';
import {removeHeaderInterceptor, requestHeaderInterceptor} from './interceptors/requestHeaderInterceptor';
import responseInterceptor from './interceptors/responseInterceptor';
import { BaseRoutes } from './routerConfig/routes';

// IMPORT PAGES
import MyTodosPage  from './pages/MyTodos/MyTodosPage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';
import { AuthTypes } from './reducers/reducers';
import { cookiesName } from './enums/cookies';
import Redirects from './routerConfig/Redirects';
import RootPage from './pages/rootPage/RootPage';
import SharedTodosPage from './pages/SharedTodos/SharedTodosPage';
import useCrypto from './hooks/useCrypto';
import useAccount from './hooks/useAccount';

const App : React.FC = () => {

  const { state, dispatch } = useContext(AppContext);
  const { logged } = useAuth();
  const { getCookie } = useCookie();
  const { decryptString } = useCrypto();
  const { getOwnAccount } = useAccount();
  const [currentInterceptor, setCurrentInterceptor] = useState<number>(0);

  const checkAuth = async ()=>{

    await logged();
  }

  useEffect(()=>{

    let token = getCookie(cookiesName.TOKEN);
    let type = getCookie(cookiesName.AUTH_TYPE);

    if (token && type){

      let decryptedToken = decryptString(token);
      let decryptedTokenType = decryptString(type);
      
      dispatch({
        authDispatch: {
            type: AuthTypes.UPDATE,
            payload : {
              authorization: {
                token : decryptedToken,
                type : decryptedTokenType
              }
            }
        }
      });
    }

    responseInterceptor();
    
  }, [])

  useEffect(()=>{

    if (state.auth.accountId !== ""){

      getOwnAccount();
    }

  }, [state.auth.accountId])

  useEffect(()=>{

    if (state.auth.authorization?.token){

      removeHeaderInterceptor(currentInterceptor);
      setCurrentInterceptor(requestHeaderInterceptor(state.auth));
      
      checkAuth();
    }

  }, [state.auth.authorization?.token])

  // DEBUG
  useEffect(()=>{
    console.log("[DEBUG]: global_state", state);
  }, [state])

  return (
    <div className="App">
      
        <Router>
            <RootPage></RootPage>
          <Routes>
            <Route path={BaseRoutes.ROOT} element={<Redirects isAuth={state.auth.status==="success"} />}></Route>
            <Route path={BaseRoutes.LOGIN} element={<LoginPage/>} ></Route>
            <Route element={<PrivateRoute isAuth={state.auth.status==="success"} />}>

              <Route path={BaseRoutes.DASHBOARD} element={<DashboardPage />}>
                <Route path={BaseRoutes.MY_TODOS} element={<MyTodosPage />} />
                <Route path={BaseRoutes.SHARED_TODOS} element={<SharedTodosPage />} />
              </Route>

            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
