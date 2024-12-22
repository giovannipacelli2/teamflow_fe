
import React from 'react'
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material';

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

  export default Card