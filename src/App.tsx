import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.scss';
import { AppContext } from './context/context';
import { useAuth } from './hooks/authHook'
import useCookie from './hooks/useCookie';

// theme setting
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/ThemeConfig';

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
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import { AlertProvider } from './context/alertContext';

const App : React.FC = () => {

  const { authState, authDispatch, setIsLoadingApp } = useContext(AppContext);
  const { logged, destroySession } = useAuth();
  const { getCookie } = useCookie();
  const { decryptString } = useCrypto();
  const { getOwnAccount, getUsernames } = useAccount();
  const [currentInterceptor, setCurrentInterceptor] = useState<number>(0);

  const checkAuth = async ()=>{

    setIsLoadingApp(true);
    await logged();
    setIsLoadingApp(false);
  }

  useEffect(()=>{

    let token = getCookie(cookiesName.TOKEN);
    let type = getCookie(cookiesName.AUTH_TYPE);

    if (token && type){

      let decryptedToken = decryptString(token);
      let decryptedTokenType = decryptString(type);
      
      authDispatch({
        type: AuthTypes.UPDATE,
        payload : {
          authorization: {
            token : decryptedToken,
            type : decryptedTokenType
          }
        }
      });
    }

    responseInterceptor(destroySession);
    
  }, [])

  useEffect(()=>{

    if (authState.accountId !== ""){

      getOwnAccount();
      getUsernames();
    }

  }, [authState.accountId])

  useEffect(()=>{

    if (authState.authorization?.token){

      removeHeaderInterceptor(currentInterceptor);
      setCurrentInterceptor(requestHeaderInterceptor(authState));
      
      checkAuth();
    }

  }, [authState.authorization?.token])

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <div className="App">
          <Router>
              <RootPage></RootPage>
            <Routes>
              <Route path={BaseRoutes.ROOT} element={<Redirects isAuth={authState.status==="success"} />}></Route>
              <Route path={BaseRoutes.SIGNUP} element={<SignupPage/>} ></Route>
              <Route path={BaseRoutes.LOGIN} element={<LoginPage/>} ></Route>
              <Route element={<PrivateRoute isAuth={authState.status==="success"} />}>

                <Route path={BaseRoutes.DASHBOARD} element={
                  <>
                    <DashboardPage>
                    </DashboardPage>
                    <Outlet/>
                  </>
                  }>
                  <Route path={BaseRoutes.MY_TASKS} element={<MyTodosPage mode='withoutChecked' />} />
                  <Route path={BaseRoutes.SHARED_TASKS} element={<SharedTodosPage />} />
                  <Route path={BaseRoutes.CHECKED_TASKS} element={<MyTodosPage mode='onlyChecked' />} />
                  <Route path={BaseRoutes.PROFILE} element={<ProfilePage />} />
                </Route>

              </Route>
            </Routes>
          </Router>
        </div>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
