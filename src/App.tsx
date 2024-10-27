import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';
import interceptor from './interceptors/interceptor';

// IMPORT PAGES
import HomePage  from './pages/home/HomePage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';

import { AuthApi } from './api';
import { AxiosError } from 'axios';

const App : React.FC = () => {

  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async ()=>{
    let authReq = new AuthApi();

    let res;

    try{
      let req = await authReq.logged();

      res = req.data;
      setIsAuth(true);
      
    } catch(error){
      if (error instanceof AxiosError){
        res = error.response?.data;
        setIsAuth(false);
      }
    }

    console.log(res);
  }

  useEffect(()=>{

    interceptor();
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
