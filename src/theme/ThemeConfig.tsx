import { createTheme } from '@mui/material/styles';

// Crea un tema custom partendo da quello di default
export const theme = createTheme({
  palette: {

    primary: {
      main: '#4e8e8d',
      light: '#81c3c2',
      dark: '#305b5a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fd8362',
      light: '#ffeeeb',
      dark: '#dd5f3c',
      contrastText: '#fff',
    },

    error: {
      main: '#f44336',
    },
    warning: {
        main: '#fd8362',
      },

  },
});