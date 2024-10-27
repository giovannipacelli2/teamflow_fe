import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage : React.FC = () => {

  const navigate = useNavigate();
  return (
    <div>
      LoginPage works
      <br /><br />
      <button
        onClick={()=>{navigate('/dashboard/home')}}
      >
        Vai alla dashboard
      </button>
    </div>
  )
}

export default LoginPage
