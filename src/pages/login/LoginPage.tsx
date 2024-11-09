import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authHook";
import { LoginRequest } from "../../api";

// MUI COMPONENTS
import { TextField, FormControl, Button, styled, FormLabel, Box, FormControlLabel, Checkbox } from "@mui/material";
import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginPage: React.FC = () => {
  interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
  }

  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginRequest>({
    username: "admin",
    password: "abc1234",
  });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = async (event: FormEvent<FormElements>) => {
    event.preventDefault();

    const { username, password } = event.currentTarget;

    let res = await login({
      username: username.value,
      password: password.value,
    });

    if (res) {
      navigate("/dashboard/home");
    }
  };

  return (
    <>
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
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="your_username"
                autoComplete="off"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'username' }}
                value={form.username}
                onChange={handleChange}
              />
          </FormControl>
          <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="********"
                autoComplete="off"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'password' }}
                value={form.password}
                onChange={handleChange}
              />
          </FormControl>
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
    </>
  );
};

export default LoginPage;
