import React from 'react';
import {Box, Modal, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import CloseBtn from '../CloseBtn/CloseBtn';

interface ModalProps {
    children?: React.ReactNode;
    title ?: string,
    diplayFooter ?: boolean,
    confirmText ?: string,
    discardText ?: string,
    isDelete ?: boolean,
    onConfirm ?: Function,
  }

const defaultProps = {
    children : <></>,
    title : 'Text',
    diplayFooter : true,
    confirmText : 'Conferma',
    discardText : 'Annulla',
    isDelete : true,
    onConfirm : ()=>{},
}


function useModal () {

  const theme = useTheme();

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      display:'flex',
      gap:'1em',
      flexDirection:'column',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '70%',
      },
      [theme.breakpoints.up('md')]: {
        width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '700px',
      },
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
    minHeight: '100px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '100px',
    },
  }
  const buttonContaier = {
    ...elemStyle,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    gap:'1em',
  }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ModalComponent = React.memo((props: ModalProps = defaultProps)=>{

      props = {
        ...props,
        children : props.children ?? defaultProps.children,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
        discardText : props.discardText ?? defaultProps.discardText,
        isDelete : props.isDelete ?? defaultProps.isDelete,
      }

      const handleConfirm = ()=>{
        handleClose();

        if (props.onConfirm){
          props.onConfirm();
        } else {
          defaultProps.onConfirm();
        }
      };

        return (
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
              >
                <Box sx={style}>
                  <Box sx={elemStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {props.title}
                    </Typography>
                    <CloseBtn action={handleClose}/>
                  </Box>
                  <Box sx={bodyContaier}>
                    {props.children}
                  </Box>
                  { props.diplayFooter && <Box sx={buttonContaier}>

                    <Button onClick={()=>handleClose()}>{props.discardText}</Button>

                      <Button 
                        color={props.isDelete ? 'warning' : 'info'}
                        onClick={()=>handleConfirm()}
                      >{props.confirmText}</Button>
                  </Box>}
                </Box>
              </Modal>
            </div>
          );
    })
  
    return {ModalComponent, open, handleOpen, handleClose}
  }

export default useModal