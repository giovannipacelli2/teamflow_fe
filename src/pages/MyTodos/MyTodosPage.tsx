import React, {useEffect, useContext, useState, ChangeEvent} from 'react'
import ShareIcon from '@mui/icons-material/Share';
import { Button, Card, CardActionArea, CardActions, CardContent, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import {TodosContext} from '../../context/todosContext'
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';
import useModal from '../../components/Modal/Modal';
import { TodoResponse } from '../../api';
import TodoForm from '../../components/Forms/TodoForm/TodoForm';

export interface editFormI {
  title : string,
  description : string,
  note : string,
}
const defaultEditForm : editFormI = {
  title : '',
  description : '',
  note : '',
}

const MyTodosPage : React.FC = () => {

  const { todoState, todosLoading, todosError } = useContext(TodosContext);
  const {handleOpen, ModalComponent} = useModal();
  const [currentTodo, setCurrentTodo] = useState<TodoResponse>({});

  const [editForm, setEditForm] = useState(defaultEditForm);

  const handleChangeEdit = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{

    const name = event.target.name;
    const value = event.target.value;
   
    setEditForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  useEffect(()=>{
    if (todoState.myTodos.length>0){
      console.log('[DEBUG]: todo_state', todoState.myTodos)
    }
  }, [todoState.myTodos]);

  const onEdit = ()=>{console.log('confirmed')}

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      <ModalComponent 
        title={'Modifica nota'}
        onConfirm={onEdit}
      >
        <TodoForm todo={currentTodo} editForm={editForm} handleChange={handleChangeEdit}/>
      </ModalComponent>

      {todosLoading && <SkeletonComponent/>}
      {
        !todosLoading && todoState.myTodos.map((todo, index)=>{
          return (
            <Card sx={
                { maxWidth: 345,
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between" 
                }} 
              key={index}
            >
              <CardActionArea onClick={()=>{
                  handleOpen();
                  setCurrentTodo(todo);
                }}>
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
