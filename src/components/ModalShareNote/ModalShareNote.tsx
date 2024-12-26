import React, {SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react';
import {Box, Modal, Button, FormControl, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import "./style.scss";
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from '../../context/context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useTodos from '../../hooks/useTodos';
import { shareTodoI } from '../../interfaces/TodosInterfaces';
import { TodoResponse } from '../../api';

interface ModalProps {
    children?: React.ReactNode;
    todo ?: TodoResponse
    title ?: string,
    diplayFooter ?: boolean,
    confirmText ?: string,
    onConfirm ?: (event: FieldValues)=>void,
  }

const defaultProps : ModalProps= {
  children: <></>,
  title: 'Text',
  todo : {
    id:''
  },
  diplayFooter: true,
  confirmText: 'Conferma',
  onConfirm: (event: FieldValues) => { },
}

interface accountField {
  id: string,
  label: string,
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
    const [open, setOpen] = useState(false);
    const { accountState } = useContext(AppContext);

    const { control, handleSubmit, setValue, getValues } = useForm();

    const resetForm = ()=>{

      setValue('accounts',{
        label:'',
        id:''
      });
    }

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => {
      setOpen(false)
    }, []);

    const ModalComponent = React.memo((props: ModalProps)=>{

      const { shareTodo, getAllTodos } = useTodos();
      const [userList, setUserList] = useState<accountField[]>([]);

      props = {
        ...props,
        children : props.children ?? defaultProps.children,
        todo : props.todo ?? defaultProps.todo,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
        onConfirm : props.onConfirm ?? defaultProps.onConfirm,
      }

      // reset all states
      useEffect(()=>{
        return()=>{
          resetForm();
        }
      }, []);
      
      // filter username list
      useEffect(()=>{

        let tmp : accountField[] = [];

        for (let user of usernames){
          if (user.id !== accountState.id){
            tmp.push({
              id : String(user.id),
              label : String(user.username)
            })
          }
        }

        setUserList(tmp);

      }, [usernames]);

      useEffect(()=>{

        if(props.todo?.sharedWith && props.todo?.sharedWith.length>0 && open){

          setValue('accounts',{
            id:props.todo?.sharedWith[0].id,
            label:props.todo?.sharedWith[0].username
          });
        }
      }, [props.todo?.sharedWith, open]);


      const handleConfirm = useCallback((event: FieldValues)=>{
        
        if (!event.accounts.id){
          handleClose();
          return;
        }

        let bodyReq : shareTodoI = {
                todoId : String(props.todo?.id),
                body : {
                  accounts: [event.accounts.id]
                }
        }
  
        shareTodo.mutate(bodyReq);

        handleClose();

        props.onConfirm && props.onConfirm(event);

      }, [props, props.onConfirm]);

      // delete todo association
      useEffect(()=>{
        if(shareTodo.isSuccess){
          getAllTodos.refetch();

          if (props.todo?.sharedWith){
            props.todo.sharedWith = []
          }
        }
      },[shareTodo.isSuccess])

      const deleteAssociation = useCallback((event: SyntheticEvent)=>{
        let accounts = getValues('accounts') as accountField;

        if(!accounts.id){
          return;
        }

        let bodyReq : shareTodoI = {
                todoId : String(props.todo?.id),
                body : {
                  accounts: []
                }
        }
  
        shareTodo.mutate(bodyReq);

      }, [props, props.onConfirm]);

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
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.primary.dark
                      }}
                    >
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
                                options={userList}
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
                        <Box>
                          <Button
                            onClick={deleteAssociation}
                            color='error'
                          >Elimina Condivisione</Button>
                        </Box>
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