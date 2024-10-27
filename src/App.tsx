import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

// ROUTER CONFIG
import PrivateRoute from './routerConfig/PrivateRoute';

// IMPORT PAGES
import HomePage  from './pages/home/HomePage';
import LoginPage  from './pages/login/LoginPage';
import DashboardPage  from './pages/dashboard/DashboardPage';

const App : React.FC = () => {

  const isAuth : boolean = true;

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
