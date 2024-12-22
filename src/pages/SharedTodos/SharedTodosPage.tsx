import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from "../../context/context";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import {TodosContext} from '../../context/todosContext'

// Components
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';
import useTodos from '../../hooks/useTodos';
import { TodoResponse } from '../../api';
import useModalEditNote from '../../components/ModalEditNote/ModalEditNote';
import { FieldValues } from 'react-hook-form';
import { updateTodoI } from '../../interfaces/TodosInterfaces';
import AlertComponent, { AlertProps } from '../../components/Alert/Alert';

const SharedTodosPage : React.FC = () => {
  const { todoState, sharedTodosLoading, sharedTodosError } = useContext(TodosContext);
  const { getAllSharedTodos, updateTodo } = useTodos();

  const [currentTodo, setCurrentTodo] = useState<TodoResponse>({});

  //alerts
  const [alertElem, setAlertElem] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertProps>({
    title:'',
    subtitle:'',
    type:'success'
  })

  //modals
  const {handleOpen:openUpdate, ModalComponent: ModalUpdate} = useModalEditNote();

  useEffect(()=>{
    getAllSharedTodos.refetch();
  }, []);

  const openAlert = ()=>{
    setAlertElem(true);
  }
  const closeAlert = ()=>{
    setAlertElem(false);
  }

  const onEdit = React.useCallback((event: FieldValues)=>{
  
      if (currentTodo.id){
        let body : updateTodoI = {
          todoId : String(currentTodo.id),
          body : event
        }
  
        updateTodo.mutate(body);
        setCurrentTodo({});
      }
      
    },[currentTodo])

  useEffect(()=>{
      if (updateTodo.data?.status){
  
        if(updateTodo.data?.status <= 201){
          setAlertType({
            title:'Successo',
            subtitle: 'Commento aggiunto con successo',
            type: 'success'
          })
        } else {
          
          setAlertType({
            title:'Errore',
            subtitle: 'Non è stato possibile commentare la nota',
            type: 'error'
          })
        }
        openAlert();
      }
    }, [updateTodo.data?.status])

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
      >
        <Button size="medium" color="primary" variant="contained" onClick={()=>getAllSharedTodos.refetch()}>
          <RefreshIcon></RefreshIcon>
          Aggiorna
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
        width={{ xs: '100%', sm: '90%'}}
      >
        {sharedTodosLoading && <SkeletonComponent/>}
        {
          !sharedTodosLoading && todoState.sharedTodos.map((todo)=>{
            return (
              <Card
                sx={{
                  width: {xs:'90%', md:'21em'},
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginRight:'1.5em',
                  '@media (min-width:600px)': {
                    width: '75%',
                  },
                }}
                key={todo.id}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {todo.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions >
                  <Button size="small" color="primary" sx={{display:"flex", gap:"0.5em"}}
                    onClick={()=>{
                      openUpdate();
                      setCurrentTodo(todo)
                    }}
                  >
                    <AddCommentOutlinedIcon></AddCommentOutlinedIcon>
                      commenta
                    </Button>
                </CardActions>
              </Card>
            );
          })
        }
        {
          (!sharedTodosLoading && !sharedTodosError && todoState.sharedTodos.length===0) && <>
            <Empty text="Nessuna nota condivisa trovata"></Empty>
          </>
        }
        {
          (sharedTodosError ) && <>
            <Empty text="Errore nel recupero delle note condivise"></Empty>
          </>
        }
      </Stack>

      <ModalUpdate 
        title={'Commenta nota'}
        onConfirm={onEdit}
        permissions='limitated'
        defaults={{
          title: String(currentTodo.title),
          description: String(currentTodo.description),
          note: String(currentTodo.note),
        }}
      >
      </ModalUpdate>

      <AlertComponent 
        activated={alertElem}
        onClose={closeAlert}
        duration={2500}
        title={alertType.title}
        subtitle={alertType.subtitle}
        type={alertType.type}
      >
      </AlertComponent>

    </Stack>
  )

}

export default SharedTodosPage
