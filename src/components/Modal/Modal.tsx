import React from 'react';
import {Box, Modal, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

interface ModalProps {
    children?: React.ReactNode;
    title ?: string,
    diplayFooter ?: boolean,
    confirmText ?: string,
    onConfirm ?: Function,
  }

const defaultProps = {
    children : <></>,
    title : 'Text',
    diplayFooter : true,
    confirmText : 'Conferma',
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
    //border: '1px solid red',
    width: '100%',
  }
  const bodyContaier = {
    ...elemStyle,
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    gap:'0.5em',
    minHeight: '300px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '300px',
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

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ModalComponent = (props: ModalProps)=>{

      props = {
        ...props,
        children : props.children ?? defaultProps.children,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {props.title}
                    </Typography>
                  </Box>
                  <Box sx={bodyContaier}>
                    {props.children}
                  </Box>
                  { props.diplayFooter && <Box sx={buttonContaier}>
                      <Button onClick={()=>handleConfirm()}>{props.confirmText}</Button>
                  </Box>}
                </Box>
              </Modal>
            </div>
          );
    }
  
    return {ModalComponent, open, handleOpen, handleClose}
  }

export default useModal