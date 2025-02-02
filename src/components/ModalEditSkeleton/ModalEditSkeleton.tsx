import React from 'react'

import { useTheme } from '@mui/material/styles';
import { Stack, Skeleton, Box, Divider, Button } from '@mui/material';
import Card from '../Card/Card';
import CloseBtn from '../CloseBtn/CloseBtn';

interface Props {
  permissions:"full" | "limitated"
}

const ModalEditSkeleton = ({permissions} : Props) => {
  const theme = useTheme();

  permissions = permissions ?? 'full';

  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    gap:'1em',
    flexDirection:'column',
    borderRadius:'0.5em',
    width:{xs:'95%', sm:'70%', md:'60%', lg:'700px'},
    maxHeight:{xs:'100%', sm:'98%', xl:'80%'},
  };

  const elemStyle = {
    width: '100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  }
  const bodyContaier = {
    ...elemStyle,
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    gap:'0.5em',
    height:'100%',
    overflowY: 'hidden',
  }
  const commentInputContainer = {
    ...elemStyle,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height: 'fit-content',
    gap:'1em',
  }
  const buttonContaier = {
    ...elemStyle,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    height: 'fit-content',
    gap:'1em',
  }
  const row = {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    width:'100%',
    gap:'1em',
  }
  const column = {
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    width:'100%',
    gap:'0.5em',
  }

  return(
      <Box 
        sx={bodyContaier}
        className='modalForm hide-scrollbar-back'
      > 
        <Box 
          className='modalFormControl hide-scrollbar-back'
          sx={{
            ...column,
            justifyContent:'flex-start',
            height:'100%',
            gap:'1.5em',
          }}
        >        
          {/* TITLE */}
          <Box sx={column}>
            <Skeleton variant="rectangular" width='35%' height={'1em'} />
            <Skeleton variant="rounded" width='100%' height={'2em'} />
          </Box>

          {/* DESCRIPTION */}
          <Box sx={column}>
            <Skeleton variant="rectangular" width='50%' height={'1em'} />
            <Skeleton variant="rounded" width='100%' height={'5em'} />
          </Box>

          {/* CHECKBOX */}
          <Box sx={row}>
              <Skeleton variant="rectangular" width='30%' height={'1em'} />
              <Skeleton variant="rectangular" width='1em' height={'1em'} />
          </Box>

          {permissions === "full" && 
            <>          
              {/* COMMENT */}  
              <Box sx={row}>
                <Skeleton variant="circular" width='2.5em' height={'2.5em'} />
                <Skeleton variant="rounded" width='70%' height={'3em'} />
              </Box>
              <Box sx={row}>
                <Skeleton variant="rounded" width='2em' height={'2em'} />
                <Skeleton variant="rounded" width='80%' height={'2em'} />
                <Skeleton variant="rounded" width='2em' height={'2em'} />
              </Box>
            </>
          }
            
        </Box>
      </Box>

  );

}

export default ModalEditSkeleton
