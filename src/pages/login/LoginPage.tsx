import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginBodyI, useAuth } from "../../hooks/authHook";

// MUI COMPONENTS
import { TextField, FormControl, Button, styled, FormLabel, Box, FormControlLabel, Checkbox } from "@mui/material";
import MuiCard from '@mui/material/Card';
import useLoading from "../../hooks/useLoading";
import { Routes } from "../../routerConfig/routes";

const Card = styled(MuiCard)(({ theme }) => {

  return {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '98%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    '@media (min-width:450px)': {
      width: '80%',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }

});

const LoginPage: React.FC = () => {

  interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
  }

  const navigate = useNavigate();
  const {LoadingElem, setIsLoading} = useLoading();

  const { login } = useAuth();

  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const [form, setForm] = useState<loginBodyI>({
    username: "",
    password: "",
    remember : true,
  });

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
      navigate(Routes.MY_TODOS);
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
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
