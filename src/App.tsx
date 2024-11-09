import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.scss';
import { AppContext } from './context/context';
import { useAuth } from './hooks/authHook'
import useCookie from './hooks/useCookie';

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';
import {removeHeaderInterceptor, requestHeaderInterceptor} from './interceptors/requestHeaderInterceptor';
import responseInterceptor from './interceptors/responseInterceptor';

// IMPORT PAGES
import HomePage  from './pages/home/HomePage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';
import { AuthTypes } from './reducers/reducers';
import { cookiesName } from './enums/cookies';
import Redirects from './routerConfig/Redirects';
import RootPage from './pages/rootPage/RootPage';

const App : React.FC = () => {

  const { state, dispatch } = useContext(AppContext);
  const { logged } = useAuth();
  const { getCookie } = useCookie();
  const [currentInterceptor, setCurrentInterceptor] = useState<number>(0);

  const checkAuth = async ()=>{

    let res = await logged();
    
    if (res){

      dispatch({
        authDispatch: {
            type: AuthTypes.UPDATE,
            payload : {
              status: "success"
            }
        }
      });
    }

  }

  useEffect(()=>{

    let token = getCookie(cookiesName.TOKEN);
    let type = getCookie(cookiesName.AUTH_TYPE);

    if (token && type){
      
      dispatch({
        authDispatch: {
            type: AuthTypes.UPDATE,
            payload : {
              authorization: {
                token, type
              }
            }
        }
      });
    }

    responseInterceptor();
    
  }, [])

  useEffect(()=>{

    if (state.auth.authorization?.token){

      removeHeaderInterceptor(currentInterceptor);
      setCurrentInterceptor(requestHeaderInterceptor(state.auth));
      
      checkAuth();
    }

  }, [state.auth.authorization?.token])

  // DEBUG
  useEffect(()=>{
    console.log("DEBUG:", state);
  }, [state])

  return (
    <div className="App">
      
        <Router>
            <RootPage></RootPage>
          <Routes>
            <Route path='/' element={<Redirects isAuth={state.auth.status==="success"} />}></Route>
            <Route path='/login' element={<LoginPage/>} ></Route>
            <Route element={<PrivateRoute isAuth={state.auth.status==="success"} />}>

              <Route path="/dashboard" element={<DashboardPage />}>
                <Route path="home" element={<HomePage />} />
              </Route>

            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
