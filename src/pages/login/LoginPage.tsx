import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/authHook';

const LoginPage : React.FC = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async ()=>{
    let username = 'admin';
    let password = 'abc1234';

    let res = await login({
      username : username,
      password : password
    });

    if (res){
      navigate('/dashboard/home')
    }
  };

  return (
    <div>
      LoginPage works
      <br /><br />
      <button
        onClick={()=>{navigate('/dashboard/home')}}
      >
        Vai alla dashboard (test)
      </button>
      <br />
      <button
        onClick={()=>handleLogin()}
      >
        Login
      </button>
    </div>
  )
}

export default LoginPage
