import React, {useEffect, useState, useContext} from 'react';
import { AppProvider } from './context/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { Logged } from './api';
import { AuthApi } from './api';
import { AppContext } from './context/context';
import { useAuth } from './hooks/authHook'

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';
import requestHeaderInterceptor from './interceptors/requestHeaderInterceptor';
import responseInterceptor from './interceptors/responseInterceptor';

// IMPORT PAGES
import HomePage  from './pages/home/HomePage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';
import { GenericResponse } from './interfaces/GenericResponse';

const App : React.FC = () => {

  const { state } = useContext(AppContext);
  const [isAuth, setIsAuth] = useState(false);
  const { logged } = useAuth();

  const checkAuth = async ()=>{

    let res = await logged();
    
    setIsAuth(res);

  }

  useEffect(()=>{

    if (state.auth){
      requestHeaderInterceptor(state.auth);
      responseInterceptor();
      checkAuth();
    }
  }, [])

  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>} ></Route>
            <Route path='/login' element={<LoginPage/>} ></Route>
            <Route element={<PrivateRoute isAuth={isAuth} />}>

              <Route path="/dashboard" element={<DashboardPage />}>ß
                <Route path="home" element={<HomePage />} />
              </Route>

            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
