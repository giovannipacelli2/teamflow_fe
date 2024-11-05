import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/authHook';
import { LoginRequest } from '../../api';

// MUI COMPONENTS
//import Box from '@mui/material/Box';
import { TextField, Box, FormControl, Button } from '@mui/material';


const LoginPage : React.FC = () => {

  interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
  }

  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm]=useState<LoginRequest>({
    username:"admin",
    password:"abc1234"
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
    let {name, value} = event.target;
    setForm((prevState)=>{
      return {
        ...prevState,
        [name]:value
      }
    })
  };

  const handleLogin = async (event : FormEvent<FormElements>)=>{
    event.preventDefault();

    const {username, password} = event.currentTarget;

    let res = await login({
      username : username.value,
      password : password.value
    });

    if (res){
      navigate('/dashboard/home')
    }
  };

  return (
    <>
      <Box>
      <form noValidate autoComplete="off" onSubmit={handleLogin}>
      <FormControl sx={{ width: '25ch' }}>
        <TextField
          required
          type='text'
          id="username"
          name="username"
          label="Required"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          required
          type='password'
          id="password"
          name="password"
          label="Required"
          value={form.password}

          onChange={handleChange}
        />
        <Button type='submit'>submit</Button>
      </FormControl>
    </form>
      </Box>
    </>
  )
}

export default LoginPage
