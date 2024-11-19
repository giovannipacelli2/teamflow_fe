import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.scss';
import { AppContext } from './context/context';
import { useAuth } from './hooks/authHook'
import useCookie from './hooks/useCookie';
import {TodosProvider} from './context/todosContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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

const queryClient = new QueryClient()

const App : React.FC = () => {

  const { authState, accountState, authDispatch, accountDispatch } = useContext(AppContext);
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

    responseInterceptor();
    
  }, [])

  useEffect(()=>{

    if (authState.accountId !== ""){

      getOwnAccount();
    }

  }, [authState.accountId])

  useEffect(()=>{

    if (authState.authorization?.token){

      removeHeaderInterceptor(currentInterceptor);
      setCurrentInterceptor(requestHeaderInterceptor(authState));
      
      checkAuth();
    }

  }, [authState.authorization?.token])

  // DEBUG
  useEffect(()=>{
    console.log("[DEBUG]: auth_state", authState);
  }, [authState])

  // DEBUG
  useEffect(()=>{
    console.log("[DEBUG]: account_state", accountState);
  }, [accountState])

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
            <RootPage></RootPage>
          <Routes>
            <Route path={BaseRoutes.ROOT} element={<Redirects isAuth={authState.status==="success"} />}></Route>
            <Route path={BaseRoutes.LOGIN} element={<LoginPage/>} ></Route>
            <Route element={<PrivateRoute isAuth={authState.status==="success"} />}>

              <Route path={BaseRoutes.DASHBOARD} element={
                <TodosProvider>
                  <DashboardPage>
                    <Outlet/>
                  </DashboardPage>
                </TodosProvider>
                }>
                <Route path={BaseRoutes.MY_TODOS} element={<MyTodosPage />} />
                <Route path={BaseRoutes.SHARED_TODOS} element={<SharedTodosPage />} />
              </Route>

            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
