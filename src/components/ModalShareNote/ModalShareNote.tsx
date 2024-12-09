import React, {useCallback, useContext, useEffect} from 'react';
import {Box, Modal, Button, FormControl, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import "./style.scss";
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from '../../context/context';

interface InputI {
  label?: string,
  id?: string,
}

interface ModalProps {
    children?: React.ReactNode;
    title ?: string,
    diplayFooter ?: boolean,
    confirmText ?: string,
    onConfirm ?: (event: FieldValues)=>void,
    defaults ?: {
      accounts: InputI
    }
  }

const defaultProps : ModalProps= {
    children : <></>,
    title : 'Text',
    diplayFooter : true,
    confirmText : 'Conferma',
    onConfirm : (event: FieldValues)=>{},
    defaults: {
      accounts:{
        label:'',
        id:''
      }
    }
}

const defaultAccount = {
    id:'c0b52077-6404-427f-9766-d04b31ab4bd8',
    label:'angeligu'
}

function useModalShareNote () {

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
    height: '100%',
  }
  const buttonContaier = {
    ...elemStyle,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    gap:'1em',
  }
    const { usernames } = useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const { control, handleSubmit, setValue } = useForm();

    const ModalComponent = React.memo((props: ModalProps)=>{

      props = {
        ...props,
        children : props.children ?? defaultProps.children,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
        defaults : props.defaults ?? defaultProps.defaults,
        onConfirm : props.onConfirm ?? defaultProps.onConfirm,
      }

      useEffect(()=>{
        //setValue('accounts', props.defaults?.accounts);
        setValue('accounts', defaultAccount);
      },[
        props.defaults
      ])

      const handleConfirm = useCallback((event: FieldValues)=>{
        console.log(event);
        handleClose();

        props.onConfirm && props.onConfirm(event);

        resetForm();

      }, [props, props.onConfirm]);

      const resetForm = ()=>{
        setValue('accounts',{
          label:'',
          id:''
        });
      }


        return (
            <div>
              <Modal
                disableAutoFocus={false}
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
                    <form 
                      className='modalForm'
                      onSubmit={handleSubmit((e)=>handleConfirm(e))}
                    >
                      <Box 
                        className='modalFormControl hide-scrollbar-back'
                      >
                        
                        <FormControl>
                          <Controller
                            name="accounts"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                disablePortal
                                options={usernames.map((item)=>({
                                  id : item.id,
                                  label : item.username
                                }))}
                                sx={{ maxWidth: 400, marginTop:'0.5em' }}
                                renderInput={(params) => <TextField 
                                  {...params}
                                  label="Scegli un utente" 
                                />}
                                onChange={(event, newValue) => {
                                  field.onChange(newValue);
                                }}
                              />
                            )}
                            
                            />
                        </FormControl>
                      </Box>
                      { props.diplayFooter && <Box sx={buttonContaier}>
                          <Button type='submit'>{props.confirmText}</Button>
                      </Box>}
                    </form>
                  </Box>
                </Box>
              </Modal>
            </div>
          );
    })
  
    return {ModalComponent, open, handleOpen, handleClose}
  }

export default useModalShareNote