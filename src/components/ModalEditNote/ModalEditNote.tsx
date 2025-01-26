import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Box, Modal, Button, FormControl, FormLabel, TextField, Checkbox} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import Textarea from '../TextArea/Textarea';
import "./style.scss";
import { GetTodo200Response, TodoResponse } from '../../api';
import { AppContext } from '../../context/context';
import CloseBtn from '../CloseBtn/CloseBtn';
import { UseQueryResult } from '@tanstack/react-query/build/legacy/types';
import { AxiosResponse } from 'axios';
import CommentList from '../CommentList/CommentList';
import useTodos from '../../hooks/useTodos';
import { createCommentI } from '../../interfaces/TodosInterfaces';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';

interface ModalProps {
    children?: React.ReactNode;
    id ?: string,
    title ?: string,
    diplayFooter ?: boolean,
    confirmText ?: string,
    onConfirm ?: (event: FieldValues)=>void,
    query ?: UseQueryResult<AxiosResponse<GetTodo200Response, any>, Error>
    permissions ?: "full" | "limitated";
  }

const defaultProps : ModalProps= {
    children : <></>,
    id: '',
    title : 'Text',
    diplayFooter : true,
    confirmText : 'Conferma',
    onConfirm : (event: FieldValues)=>{},
    permissions: 'full',
}

function useModalEditNote () {

  const theme = useTheme();

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

  const descriptionStyle = {
    color: theme.palette.text.secondary,
    marginLeft:'0.5em'
  };
     
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const { usernames } = useContext(AppContext)

    const {createComment, deleteComment} = useTodos(false);

    const { 
      control,
      handleSubmit,
      setValue,
      formState:{errors},
      setError 
    } = useForm({defaultValues:{
        title:'',
        description:'',
        checked: false,
      }});

    const { 
      control:commentCtr,
      handleSubmit: addComment,
      setValue: setComment,
      formState:{errors:commentErrors},
      setError: setCommentError 
    } = useForm({defaultValues:{
        comment:'',
      }});

    const [todo, setTodo] = useState<TodoResponse>({});
    const [firstLoad, setFirstLoad] = useState<boolean>(false);

    const ModalComponent = (props: ModalProps)=>{

      props = {
        ...props,
        id : props.id ?? defaultProps.id,
        children : props.children ?? defaultProps.children,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
        permissions : props.permissions ?? defaultProps.permissions,
        onConfirm : props.onConfirm ?? defaultProps.onConfirm,
      }

      useEffect(()=>{
        if (!open){
          setFirstLoad(false);
        }
      }, [open]);

      useEffect(()=>{
          console.log('firstLoad', firstLoad)

      }, [firstLoad]);

      useEffect(()=>{

        if (props.query && props.query.data && !firstLoad){
          let todo = props.query.data?.data.data ?? {};
          setTodo(todo);

          setValue('title', todo.title ?? '');
          setValue('description', todo.description ?? '');
          setValue('checked', todo.checked ?? false);
        }

        if (!firstLoad && open){
          console.log('ni')
          setFirstLoad(!firstLoad);
        }

      },[props.query?.data?.data.data])

      const handleConfirm = useCallback((event: FieldValues)=>{
        handleClose();

        props.onConfirm && props.onConfirm(event);

        resetForm();

      }, [props, props.onConfirm]);

      const handleComment = async (event: FieldValues)=>{
        
        let body : createCommentI = {
          todoId: props.query?.data?.data.data?.id ?? '',
          body:{
            content: event.comment ?? ''
          }
        }

        let created = await createComment.mutateAsync(body);

        if (created.status === 201){
          setComment('comment', '');
          props.query?.refetch();
        }

      };

      const resetForm = ()=>{
        setValue('title',"");
        setValue('description',"");
        setValue('checked', false);
      }

      const onDeleteComment = async (id:string)=>{
        let deleted = await deleteComment.mutateAsync({commentId: id})

        if (deleted.status === 200){
          props.query?.refetch();
        }
      };

      const findUser = () =>{
        let user = usernames.find((user)=> user.id === todo.account_id);

        return user ? user.username : '';
      };


        return (
            <div>
              <Modal
                disableAutoFocus={false}
                open={props.query ? props.query.isSuccess && open : open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
              >
                <Box sx={style}>
                  <Box sx={elemStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {props.title}
                    </Typography>
                    <CloseBtn action={handleClose}/>
                  </Box>
                  <Divider component='div'></Divider>
                  <Box 
                    sx={bodyContaier}
                    className='modalForm hide-scrollbar-back'
                  > 
                    <Box 
                      className='modalFormControl hide-scrollbar-back'
                    >
                      {props.permissions === 'limitated' && 
                        <div className="row">
                          <Typography variant="h6" component="h3">Titolo</Typography>
                          <Typography variant="subtitle1" component="h6"
                            sx={descriptionStyle}
                          >{todo.title}</Typography>
                        </div>
                      }
                      {props.permissions === 'limitated' && 
                        <div className="row">
                        <Typography variant="h6" component="h3">Descrizione</Typography>
                        <Typography variant="subtitle1" component="h6"
                          sx={descriptionStyle}
                        >{todo.description?.split('\n').map((text, index)=>{
                          return <p key={index}>{text}</p>
                        })}</Typography>
                      </div>
                      }
                      {props.permissions === 'full' && 
                        <FormControl>
                          <FormLabel htmlFor="title">Titolo</FormLabel>
                          <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={field.name}
                                type="text"
                                fullWidth
                                variant="outlined"
                              />
                            )}
                          />
                        </FormControl>
                      }
                      {props.permissions === 'limitated' && 
                        <div className="row">
                        <Typography variant="h6" component="h3">Condivisa da</Typography>
                        <Typography variant="subtitle1" component="h6"
                          sx={descriptionStyle}
                        >{todo.account_id && findUser()}</Typography>
                      </div>
                      }
                      {props.permissions === 'full' && 
                        <FormControl>
                          <FormLabel htmlFor="description">Descrizione</FormLabel>
                          <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Textarea
                                {...field}
                                id={field.name}
                                sx={{minWidth:"100%", maxWidth:'100%', fontSize:'1em'}}
                                minRows={3}
                                maxRows={10}
                              />
                            )}
                          />
                        </FormControl>
                      }
                      {props.query?.data && <FormControl sx={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        gap:'0.5em',
                      }}>
                        <FormLabel htmlFor="checked">Completato</FormLabel>
                        <Controller
                          name="checked"
                          control={control}
                          defaultValue={false}
                          rules={{ required: false }}
                          render={({ field: { onChange, value, ...field } }) => (
                            <Checkbox
                              {...field}
                              id={field.name}
                              checked={value}
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          )}
                        />
                      </FormControl>}
                      <CommentList 
                        comments={todo.comments ?? []}
                        onDelete={onDeleteComment}
                      />

                      { props.query?.data && <Box sx={commentInputContainer}>
                        <Box sx={{
                            width:'3.7em',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            color: theme.palette.grey['600']
                          }}
                        >
                          <CommentIcon></CommentIcon>
                        </Box>
                        <FormControl
                          sx={{
                            width:'100%',
                          }}
                        >
                          <Controller
                            name="comment"
                            control={commentCtr}
                            defaultValue=""
                            rules={{ required: false }}
                            render={({ field: { onChange, value, ...field }  }) => (
                              <TextField
                                {...field}
                                id={field.name}
                                size='small'
                                placeholder='Commenta'
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                              />
                            )}
                          />
                        </FormControl>
                        <Button 
                          sx={{
                            width:'5%',
                          }}
                          onClick={addComment((e)=>handleComment(e))}
                        >
                          <SendIcon></SendIcon>
                        </Button>
                      </Box>}
                      
                    </Box>
                  </Box>
                    <Divider component='div'></Divider>
                      { props.diplayFooter && 
                        <Box sx={buttonContaier}>
                          <Button onClick={handleSubmit((e)=>handleConfirm(e))}>{props.confirmText}</Button>
                        </Box>
                      }
                </Box>
              </Modal>
            </div>
          );
    }
  
    return {ModalComponent, open, handleOpen, handleClose}
  }

export default useModalEditNote