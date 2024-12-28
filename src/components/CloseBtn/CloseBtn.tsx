import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';

interface CloseBtnProps {
    action : Function
}

const CloseBtn = ({action} : CloseBtnProps) => {
    const theme = useTheme();
  return (
    <div>
      <CloseIcon
        sx={{
            color: theme.palette.error.main,
            cursor:'pointer'
        }}
        onClick={()=>{action()}}
      ></CloseIcon>
    </div>
  )
}

export default CloseBtn
