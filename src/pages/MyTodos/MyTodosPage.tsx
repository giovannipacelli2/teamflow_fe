import React, {useEffect, useContext, useState} from 'react'
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material';
import {AppContext} from '../../context/context'
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';
import { TodoBodyReq, TodoResponse } from '../../api';
import useModalEditNote from '../../components/ModalEditNote/ModalEditNote';
import { FieldValues } from 'react-hook-form';
import useTodos from '../../hooks/useTodos';
import { deleteTodoI, updateTodoI } from '../../interfaces/TodosInterfaces';
import useModalShareNote from '../../components/ModalShareNote/ModalShareNote';
import useModal from '../../components/Modal/Modal';
import { getMsgFromObjValues } from '../../library/library';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AlertContext } from '../../context/alertContext';

export interface MyTodosPageI {
  mode ?: "all" | "withoutChecked" | "onlyChecked",
}

export interface editFormI {
  title : string,
  description : string,
  note : string,
}


const MyTodosPage = (props: MyTodosPageI) => {

  props = {
    ...props,
    mode : props.mode ?? 'all',
  }
  
  const theme = useTheme();
  //modals
  const {handleOpen:openUpdate, ModalComponent: ModalUpdate} = useModalEditNote();
  const {handleOpen:openDelete, ModalComponent: ModalDelete} = useModal();
  const {handleOpen:openCreate, ModalComponent:ModalCreate} = useModalEditNote();
  const {handleOpen:openShare, ModalComponent:ModalShare} = useModalShareNote();


  const { setAlertType, openAlert } = useContext(AlertContext);
  const { authState } = useContext(AppContext);
  
  const [currentTodo, setCurrentTodo] = useState<string>('');

  const {getAllTodos, createTodo, updateTodo, deleteTodo, shareTodo} = useTodos();
  const { data:todoState, isLoading:todosLoading, isError:todosError} = getAllTodos;

  useEffect(()=>{
    getAllTodos.refetch();
  },[]);

  const onEdit = React.useCallback((event: FieldValues)=>{

    if (currentTodo){
      let body : updateTodoI = {
        todoId : String(currentTodo),
        body : event
      }

      updateTodo.mutate(body);
      if(updateTodo.isSuccess){
        setCurrentTodo('');
      }
    }
    
  },[currentTodo])

  const onCreate = React.useCallback((event: FieldValues)=>{

    if (authState.accountId){
      let body : TodoBodyReq = {
        title: event.title,
        description: event.description,
        note: event.note,
        checked: event.checked,
      }

      createTodo.mutate(body);
    }
    
  },[])

  const onDelete = React.useCallback((id: string)=>{

      let body : deleteTodoI = {
        todoId : id,
      }

      deleteTodo.mutate(body);
    
  },[])

  useEffect(()=>{
    if (createTodo.data?.status){

      if(createTodo.data?.status <= 201){
        setAlertType({
          title:'Successo',
          subtitle: 'Nota creata con successo',
          type: 'success'
        })
      } else {
        
        let msg = getMsgFromObjValues(createTodo.data.data.message);

        msg = msg ?? 'Non è stato possibile creare la nota';

        setAlertType({
          title:'Errore',
          subtitle: msg,
          type: 'error'
        })
      }
      openAlert();
    }
  }, [createTodo.data?.status])
  
  useEffect(()=>{
    if (shareTodo.data?.status){

      if(shareTodo.data?.status <= 201){
        setAlertType({
          title:'Successo',
          subtitle: 'La nota è stata condivisa',
          type: 'success'
        })
      } else {
        
        setAlertType({
          title:'Errore',
          subtitle: 'Non è stato possibile condividere la nota',
          type: 'error'
        })
      }
      openAlert();
    }
  }, [shareTodo])

  useEffect(()=>{
    if (deleteTodo.data?.status){

      if(deleteTodo.data?.status <= 201){
        setAlertType({
          title:'Successo',
          subtitle: 'Nota eliminata con successo',
          type: 'success'
        })
      } else {
        
        setAlertType({
          title:'Errore',
          subtitle: 'Non è stato possibile eliminare la nota',
          type: 'error'
        })
      }
      openAlert();
    }
  }, [deleteTodo.data?.status])

  const getTodoList = ()=>{

    let res = todoState?.data.data?.data ?? []
    
    if (!res) return[];

    let allTodos : TodoResponse[] = [...res];

    let todoList = [];

    for(let todo of allTodos){

      let isVisible = true;

      if (props.mode === 'withoutChecked'){
        isVisible = !todo.checked;
      }

      if (props.mode === 'onlyChecked'){
        isVisible = !!todo.checked;
      }

      if(isVisible){        
        todoList.push(
          <Card
            sx={{
              width: {xs:'90%', md:'21em'},
              height:'9.5em',
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginRight: {xs:'0', md:'1.5em'},
              '@media (min-width:600px)': {
                width: '75%',
              },
              //background:todo.checked ? theme.palette.grey[200] : 'inherit'
              background:todo.checked ? theme.palette.secondary.light : 'inherit'
            }}
            key={todo.id}
          >
            <CardActionArea
              onClick={() => {
                openUpdate();
                setCurrentTodo(todo.id ?? '');
              }}
              sx={{
                height:'8em',
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.title}
                </Typography>
                <Typography variant="body2" 
                  sx={{ 
                    color: "text.secondary",
                    overflowY:'hidden',
                    height:'3em',
                  }}
                >
                  {todo.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}
            >
              <Button size="small" color="primary"
                onClick={()=>{
                  openShare();
                  setCurrentTodo(todo.id ?? '');
                }}
              >
                <ShareIcon></ShareIcon>
                condividi
              </Button>
              <Button size="small" color="warning"
                onClick={()=>{
                  openDelete();
                  setCurrentTodo(todo.id ?? '');
                }}
              >
                <DeleteIcon></DeleteIcon>
                elimina
              </Button>
            </CardActions>
          </Card>
        )
      }
    }

    return todoList;
  }
  

  return (
    <Stack
      spacing={{ xs: 2, sm: 3 }}
      direction='column'
      justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
      alignItems={{ xs: 'center', sm: 'center' }}
      sx={{ 
        flexWrap: 'wrap', 
        rowGap: { sm: '2em' },
      }}
    >
      <Box
        width="95%"
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        gap='0.5em'
      >
        {
          props.mode !=='onlyChecked' &&
          <Button size="medium" color="primary" variant="contained" onClick={openCreate}>
            <AddIcon></AddIcon>
            Aggiungi
          </Button>
        }
        <Button size="medium" color="primary" variant="contained" onClick={()=>getAllTodos.refetch()}>
          <RefreshIcon></RefreshIcon>
        </Button>
      </Box>

      <Stack
        //spacing={{ xs: 2, sm:'inherit'}}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
        alignItems={{ xs: 'center', sm: 'center' }}
        sx={{ 
          flexWrap: 'wrap', 
          rowGap: { xs: '1.5em' },
        }}
        width={{ xs: '100%', sm: '95%'}}
      >

        {(todosLoading || getAllTodos.isRefetching) && <SkeletonComponent/>}
        {
          !(todosLoading || getAllTodos.isRefetching) && getTodoList()
        }
        {
          (!todosLoading && !todosError && getTodoList().length===0) && <>
          <Empty text="Nessuna nota trovata"></Empty>
        </>
        }
        {
          (todosError) && <>
          <Empty text="Errore nel recupero delle note"></Empty>
        </>
        }
      </Stack>
      {/* <ModalUpdate 
        title={'Modifica nota'}
        onConfirm={onEdit}
        defaults={currentTodo}
      >
      </ModalUpdate> */}

      <ModalCreate 
        title={'Crea nota'}
        onConfirm={onCreate}
      >
      </ModalCreate>
      {/* <ModalShare 
        title={'Condividi nota'}
        todo={currentTodo}
      >
      </ModalShare> */}
      <ModalDelete 
        title={'Elimina nota'}
        onConfirm={()=>onDelete(String(currentTodo))}
      >
        <Typography id="modal-modal-title" variant="subtitle1" component="h6">
          Sei sicuro di voler eliminare la nota?
        </Typography>
      </ModalDelete>

    </Stack>
  )
}

export default MyTodosPage
