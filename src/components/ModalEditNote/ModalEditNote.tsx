import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Box, Modal, Button, FormControl, FormLabel, TextField, Checkbox} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import Textarea from '../TextArea/Textarea';
import "./style.scss";
import { TodoResponse } from '../../api';
import { AppContext } from '../../context/context';
import CloseBtn from '../CloseBtn/CloseBtn';
import CommentList from '../CommentList/CommentList';
import useTodos from '../../hooks/useTodos';
import { createCommentI } from '../../interfaces/TodosInterfaces';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import { useQueryClient } from '@tanstack/react-query';
import ModalEditSkeleton from '../ModalEditSkeleton/ModalEditSkeleton';

interface ModalProps {
    children?: React.ReactNode;
    id ?: string,
    title ?: string,
    isOpen ?: boolean,
    diplayFooter ?: boolean,
    confirmText ?: string,
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>,
    onConfirm ?: (event: FieldValues)=>void,
    permissions ?: "full" | "limitated";
  }

const defaultProps : ModalProps= {
    children : <></>,
    id: '',
    title : 'Text',
    isOpen : false,
    diplayFooter : true,
    confirmText : 'Conferma',
    setIsOpen : ()=>{},
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
    padding: {xs:'1.5em 0.7em', sm:'2em'},
    display:'flex',
    gap:'1em',
    flexDirection:'column',
    borderRadius:'0.5em',
    width:{xs:'98%', sm:'70%', md:'60%', lg:'700px'},
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
    flexDirection:{xs:'column', sm:'row'},
    alignItems:{xs:'flex-start', sm:'center'},
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
    const { usernames } = useContext(AppContext)

    const {createComment, deleteComment, useGetTodo} = useTodos(false);

    const { 
      control,
      handleSubmit,
      register,
      reset,
      setValue,
      formState:{errors},
      setError 
    } = useForm({
        defaultValues:{
          title:'',
          description:'',
          checked: false,
        }, 
        mode:"onSubmit",
    });

    const { 
      control:commentCtr,
      handleSubmit: addComment,
      setValue: setComment,
      formState:{errors:commentErrors},
      setError: setCommentError 
    } = useForm({defaultValues:{
        comment:'',
      }});

    const ModalComponent = (props: ModalProps)=>{

      props = {
        ...props,
        id : props.id ?? defaultProps.id,
        isOpen : props.isOpen ?? defaultProps.isOpen,
        children : props.children ?? defaultProps.children,
        title : props.title ?? defaultProps.title,
        diplayFooter : props.diplayFooter ?? defaultProps.diplayFooter,
        confirmText : props.confirmText ?? defaultProps.confirmText,
        permissions : props.permissions ?? defaultProps.permissions,
        onConfirm : props.onConfirm ?? defaultProps.onConfirm,
      }

      //const queryClient = useQueryClient()
      const {data:todoData, status, refetch, isLoading} = useGetTodo(props.id ?? '');
      const firstRender = useRef(false);

      useEffect(()=>{

        return ()=>{
          if (firstRender.current){
            console.log('[CLEANUP]: ModalEditNote')
            reset();
          }
        }
      }, []);

      useEffect(()=>{

        if (props.id && status === 'success'){
          setValue('title', todoData?.data.data?.title ?? '');
          setValue('description', todoData?.data.data?.description ?? '');
          setValue('checked', todoData?.data.data?.checked ?? false);
        }

      },[props.id, status, todoData?.data.data])


      const handleConfirm = useCallback((event: FieldValues)=>{
        
        props.onConfirm && props.onConfirm(event);

        firstRender.current = true;
        
        //refetch();
        props.setIsOpen(false);

      }, [props, props.onConfirm]);

      const handleComment = async (event: FieldValues)=>{
        
        let body : createCommentI = {
          todoId: todoData?.data.data?.id ?? '',
          body:{
            content: event.comment ?? ''
          }
        }

        let created = await createComment.mutateAsync(body);

        if (created.status === 201){
          setComment('comment', '');
          refetch();
        }

      };

      const onDeleteComment = async (id:string)=>{
        let deleted = await deleteComment.mutateAsync({commentId: id})

        if (deleted.status === 200){
          refetch();
        }
      };

      const findUser = () =>{
        let user = usernames.find((user)=> user.id === todoData?.data.data?.account_id);

        return user ? user.username : '';
      };


        return (
            <div>
              <Modal
                disableAutoFocus={false}
                open={todoData?.data.data?.id ? status === 'success' : true}
                onClose={()=>{
                  firstRender.current = true;
                  props.setIsOpen(false);
                }}
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
                      <CloseBtn action={()=>{
                        firstRender.current = true;
                        props.setIsOpen(false);
                      }}/>
                    </Box>
                    <Divider component='div'></Divider>
                    {
                      !isLoading ?
                        <Box 
                          sx={bodyContaier}
                          className='modalForm hide-scrollbar-back hide-scrollbar'
                        > 
                          <Box 
                            className='modalFormControl hide-scrollbar-back hide-scrollbar'
                          >
                            {props.permissions === 'limitated' && 
                              <div className="row">
                                <Typography variant="h6" component="h3">Titolo</Typography>
                                <Typography variant="subtitle1" component="h6"
                                  sx={descriptionStyle}
                                >{todoData?.data.data?.title}</Typography>
                              </div>
                            }
                            {props.permissions === 'limitated' && 
                              <div className="row">
                              <Typography variant="h6" component="h3">Descrizione</Typography>

                              <Typography variant="subtitle1" component="h6"
                                sx={descriptionStyle}
                              >
                                {
                                  todoData?.data.data?.description ?
                                    todoData?.data.data?.description?.split('\n').map((text, index)=>{
                                      return <p key={index}>{text}</p>
                                    }) :
                                    <>Nessuna descrizione</>
                                }
                              </Typography>
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
                                      {...register("title",{
                                        required:false
                                      })}
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
                              >{todoData?.data.data?.account_id && findUser()}</Typography>
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
                                      {...register("description",{
                                        required:false
                                      })}
                                      sx={{minWidth:"100%", maxWidth:'100%', fontSize:'1em'}}
                                      minRows={3}
                                      maxRows={10}
                                    />
                                  )}
                                />
                              </FormControl>
                            }
                            {todoData && <FormControl sx={{
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
                                    {...register("checked",{
                                      required:false
                                    })}
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                                  />
                                )}
                              />
                            </FormControl>}
                            <CommentList 
                              comments={todoData?.data.data?.comments ?? []}
                              onDelete={onDeleteComment}
                            />

                            { todoData && <Box sx={commentInputContainer}>
                              <Box sx={{
                                  width:'3.7em',
                                  display:{xs:'none', sm:'flex'},
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
                                variant='text'
                                sx={{
                                  width:'5%',
                                  display:{xs:'none', sm:'block'}
                                }}
                                onClick={addComment((e)=>handleComment(e))}
                              >
                                <SendIcon></SendIcon>
                              </Button>

                              <Button 
                                variant='outlined'
                                sx={{
                                  width:'max-content',
                                  display:{xs:'block', sm:'none'}
                                }}
                                onClick={addComment((e)=>handleComment(e))}
                              >
                                Aggiungi
                              </Button>
                            </Box>}
                            
                          </Box>
                        </Box>
                      : <ModalEditSkeleton permissions='full'></ModalEditSkeleton>
                    }
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
  
    return {ModalComponent}
  }

export default useModalEditNote