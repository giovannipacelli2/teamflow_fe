import React, {SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react';
import {Box, Modal, Button, FormControl, TextField, Stack, List, ListItem, IconButton, ListItemText, Divider} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import "./style.scss";
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from '../../context/context';
import useTodos from '../../hooks/useTodos';
import { shareTodoI } from '../../interfaces/TodosInterfaces';
import { TodoResponse } from '../../api';
import CloseBtn from '../CloseBtn/CloseBtn';
import DeleteIcon from '@mui/icons-material/Delete';

import _ from 'lodash';

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
      width: '95%',
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

    const ModalComponent = (props: ModalProps)=>{

      const { shareTodo } = useTodos();
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

        // get array of user ids already shared
        let sharedWith = props.todo?.sharedWith ?? [];
        sharedWith = _.differenceBy(usernames, sharedWith, 'id');

        // exclude current user id + transform data for select

        for (let user of sharedWith){
          if (user.id !== accountState.id){
            tmp.push({
              id : String(user.id),
              label : String(user.username)
            })
          }
        }

        setUserList(tmp);

      }, [usernames]);

      const handleConfirm = useCallback((event: FieldValues)=>{
        
        if (!event.accounts.id){
          return;
        }

        if (props.todo?.sharedWith){
          let accounts = props.todo?.sharedWith.map((user)=>user.id) ?? [];
  
          let bodyReq : shareTodoI = {
                  todoId : String(props.todo?.id),
                  body : {
                    accounts: [
                      ...accounts,
                      event.accounts.id
                    ]
                  }
          }
    
          shareTodo.mutate(bodyReq);
  
          props.onConfirm && props.onConfirm(event);
        }

      }, [props, props.onConfirm]);

      const deleteAssociation = useCallback(async (event: SyntheticEvent)=>{

        let bodyReq : shareTodoI = {
                todoId : String(props.todo?.id),
                body : {
                  accounts: []
                }
        }
  
        //shareTodo.mutate(bodyReq);
        let deleted = await shareTodo.mutateAsync(bodyReq);

        if (deleted.status === 200){
          resetForm();
        }

      }, [props, props.onConfirm]);

      const deleteSharingAccount = (id:string)=>{

        if (props.todo?.sharedWith){
          let accounts = props.todo?.sharedWith.map((user)=>String(user.id)) ?? [];
          
  
          let bodyReq : shareTodoI = {
                  todoId : String(props.todo?.id),
                  body : {
                    accounts: [
                      ...accounts.filter((user)=>user !== id),
                    ]
                  }
          }
    
          shareTodo.mutate(bodyReq);
        }
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
                    <form 
                      className='modalForm'
                      onSubmit={handleSubmit((e)=>handleConfirm(e))}
                    >
                      <Box 
                        className='modalFormControl hide-scrollbar-back'
                      >

                        <Divider variant="middle"/>
                        
                        <List 
                          sx={{ 
                            width: '100%',
                            bgcolor: 'background.paper',
                            maxHeight:'7.2em',
                            overflowY:'scroll',
                          }}
                        >
                          {props.todo?.sharedWith && props.todo?.sharedWith.map((user, index)=> (
 
                            <ListItem
                              key={user.id}
                              sx={{
                                maxWidth:420,
                              }}
                              //disableGutters
                              secondaryAction={
                                <IconButton 
                                  aria-label="shared-users"
                                  onClick={()=>deleteSharingAccount(String(user.id))}
                                  sx={{
                                    color: theme.palette.error.light
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemText 
                                primary={user.username} 
                                sx={{
                                  color: theme.palette.grey[700]
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>

                        
                        <Typography id="modal-modal-title" variant="body1" component="h3"
                        >
                          Condividi con:
                        </Typography>
                        <Divider variant="middle"/>
                        
                        <FormControl>
                          <Controller
                            name="accounts"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id={field.name}
                                disablePortal
                                options={userList}
                                sx={{ maxWidth: 400, marginTop:'0.5em' }}
                                renderInput={(params) => <TextField 
                                  {...params}
                                  label="Aggiungi utente" 
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
                          <Button
                            onClick={deleteAssociation}
                            color='error'
                          >Elimina Condivisione</Button>
                          <Button type='submit'>{props.confirmText}</Button>
                      </Box>}
                    </form>
                  </Box>
                </Box>
              </Modal>
            </div>
          );
    }
  
    return {ModalComponent, open, handleOpen, handleClose}
  }

export default useModalShareNote