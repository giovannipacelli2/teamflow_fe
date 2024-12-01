import React, {useEffect, useContext, useState} from 'react'
import ShareIcon from '@mui/icons-material/Share';
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material';
import {TodosContext} from '../../context/todosContext'
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';
import useModal from '../../components/Modal/Modal';
import { TodoResponse } from '../../api';
import useModalEditNote from '../../components/ModalEditNote/ModalEditNote';
import { FieldValues } from 'react-hook-form';

export interface editFormI {
  title : string,
  description : string,
  note : string,
}


const MyTodosPage : React.FC = () => {

  const theme = useTheme();
  
  const { todoState, todosLoading, todosError } = useContext(TodosContext);
  const {handleOpen, ModalComponent} = useModalEditNote();
  const [currentTodo, setCurrentTodo] = useState<TodoResponse>({});

  useEffect(()=>{
    if (todoState.myTodos.length>0){
      console.log('[DEBUG]: todo_state', todoState.myTodos)
    }
  }, [todoState.myTodos]);

  const onEdit = React.useCallback((event: FieldValues)=>{console.log(event)},[])

  return (
    <Stack
      spacing={{ xs: 2, sm: 3 }}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
      alignItems={{ xs: 'center', sm: 'center' }}
      sx={{ 
        flexWrap: 'wrap', 
        rowGap: { sm: '2em' },
      }}
    >
      <ModalComponent 
        title={'Modifica nota'}
        onConfirm={onEdit}
        defaults={{
          title: String(currentTodo.title),
          description: String(currentTodo.description),
          note: String(currentTodo.note),
        }}
      >
      </ModalComponent>

      {todosLoading && <SkeletonComponent/>}
      {
        !todosLoading && todoState.myTodos.map((todo)=>{
          return (
            <Card
              sx={{
                maxWidth: 345,
                width: {xs:'90%', sm:'auto'},
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              key={todo.id}
            >
              <CardActionArea
                onClick={() => {
                  handleOpen();
                  setCurrentTodo(todo);
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {todo.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <ShareIcon></ShareIcon>
                  condividi
                </Button>
              </CardActions>
            </Card>
          );
        })
      }
      {
        (!todosLoading && !todosError && todoState.myTodos.length===0) && <>
        <Empty text="Nessuna nota trovata"></Empty>
      </>
      }
      {
        (todosError) && <>
        <Empty text="Errore nel recupero delle note"></Empty>
      </>
      }
    </Stack>
  )
}

export default MyTodosPage
