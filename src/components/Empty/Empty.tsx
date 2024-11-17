import React from 'react'
import emptyImg from "../../img/empty_placeholder.png";

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

interface EmptyI {
  text ?: string
}

const defaults : EmptyI = {
  text:"No items found"
}

const Empty : ({ text }: EmptyI) => JSX.Element = ({text=defaults.text}) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width:"100%",
      height:"80lvh",
    }}>
      <Box
        sx={{
          width:"90%",
          [theme.breakpoints.up('sm')]: {
            width: '450px',
          },
        }}
      >
        <img 
          src={emptyImg} alt=""
          width="100%"
        />
        <Typography variant="h5" noWrap component="div" sx={{
          color:'#b3b3b3',
          width:"100%",
          textAlign: "center",
        }}>
              {text}
          </Typography>
      </Box>
    </Box>
  )
}

export default Empty
