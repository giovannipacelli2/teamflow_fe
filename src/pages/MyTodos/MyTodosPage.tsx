import React, {useEffect, useState} from 'react'
import { AppContext } from "../../context/context";
import { UserTypes } from '../../reducers/reducers';
import { useNavigate } from 'react-router-dom';
import useTodos from '../../hooks/useTodos';
import { TodoResponse } from '../../api';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';

const MyTodosPage : React.FC = () => {

  const { state ,dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();
  const {getAllTodos} = useTodos();
  const [todos, setTodos] = useState<TodoResponse[]>([]);

  useEffect(()=>{
    if (state.account.id){
      handleGetTodos();
    }
  }, [state.account]);

  useEffect(()=>{
    if (todos.length>0){
      console.log('[DEBUG]: todo_state', todos)
    }
  }, [todos]);

  const handleGetTodos = async ()=>{
    let res = await getAllTodos();
    setTodos(res);
  }

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      {
        todos.map((todo, index)=>{
          return (
            <Card sx={
                { maxWidth: 345,
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between" 
                }} 
              key={index}
            >
              <CardActionArea onClick={()=>{console.log('premuto ' + todo.id)}}>
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
    </Stack>
  )
}

export default MyTodosPage
