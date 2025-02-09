import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginBodyI, useAuth } from "../../hooks/authHook";

// MUI COMPONENTS
import { TextField, FormControl, Button, FormLabel, Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import useLoading from "../../hooks/useLoading";
import { Routes } from "../../routerConfig/routes";
import { Link } from "react-router-dom";

// Custom elem
import Card from '../../components/Card/Card';
import { AppContext } from "../../context/context";

const LoginPage: React.FC = () => {

  interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
  }

  const navigate = useNavigate();
  const { authState, accountState, prevRoute } = useContext(AppContext);
  const {LoadingElem, setIsLoading} = useLoading();

  const { login } = useAuth();

  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const [form, setForm] = useState<loginBodyI>({
    username: "",
    password: "",
    remember : true,
  });

  //DEBUG, SET DEV ACCOUNT AS DEFAULT
  useEffect(()=>{
    if (process.env.NODE_ENV){

      let devMode = process.env.NODE_ENV;
      if (devMode === 'development'){
        setForm((prevState)=>({
          ...prevState,
          username : 'test@dev.com'
        }))
      }
    }

    // redirect if already logged in
    if(authState.authorization?.token && accountState.id){
      navigate(prevRoute.pathname);
    }

    
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (loginError) {
      setLoginError(false);
      setLoginErrorMessage('');
    }

    const name = event.target.name;
    const value = event.target.type == "checkbox" ? event.target.checked : event.target.value;

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

  };

  const handleLogin = async (event: FormEvent<FormElements>) => {
    event.preventDefault();

    const { username, password, remember } = event.currentTarget;

    setIsLoading(true);
    
    let res = await login({
      username: username.value,
      password: password.value,
      remember : remember.checked
    });

    if (res) {
      navigate(Routes.MY_TASKS);
    } else {
      setLoginError(true);
      setLoginErrorMessage('Credenziali errate');
    }
    setIsLoading(false);
  };

  return (
    <>
      {LoadingElem}
      <Box
              component="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100dvh',
                gap: 2,
              }}
      >
        <Card variant="outlined">
          <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
            <FormControl>
                <FormLabel htmlFor="username">Username/Email</FormLabel>
                <TextField
                  error={loginError}
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="off"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={loginError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'username' }}
                  value={form.username}
                  onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={loginError}
                  helperText={loginErrorMessage}
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="off"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={loginError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'password' }}
                  value={form.password}
                  onChange={handleChange}
                />
            </FormControl>
            <FormControlLabel
                control={
                  <Checkbox 
                    color="primary"
                    id="remember"
                    name="remember"
                    onChange={handleChange}
                    checked={form.remember}
                  />
                }
                label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <Typography variant="body1" component="h6">
              oppure <Link to={Routes.SIGNUP}>registrati</Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
