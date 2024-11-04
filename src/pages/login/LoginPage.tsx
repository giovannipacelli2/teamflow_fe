import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/authHook';

// MUI COMPONENTS
//import Box from '@mui/material/Box';
import { TextField, Box, useFormControl, FormControl } from '@mui/material';

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
    <>
      <Box>
      <form noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </FormControl>
    </form>
      </Box>
    </>
  )
}

export default LoginPage
