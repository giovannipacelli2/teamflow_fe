import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';
import requestHeaderInterceptor from './interceptors/requestHeaderInterceptor';
import responseInterceptor from './interceptors/responseInterceptor';

// IMPORT PAGES
import HomePage  from './pages/home/HomePage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';
import { GenericResponse } from './interfaces/GenericResponse';
import { Logged } from './api';

import { AuthApi } from './api';

const App : React.FC = () => {

  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async ()=>{
    let authReq = new AuthApi();

    let res = await authReq.logged();

    let data = res.data as GenericResponse<Logged>;

    if (data.status >= 200 && data.status < 400){

      setIsAuth(true);
    } else {
      
      setIsAuth(false);
    }
  }

  useEffect(()=>{

    requestHeaderInterceptor();
    responseInterceptor();
    checkAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} ></Route>
          <Route path='/login' element={<LoginPage/>} ></Route>
          <Route element={<PrivateRoute isAuth={isAuth} />}>

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
