import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from "../../context/context";
import ShareIcon from '@mui/icons-material/Share';
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import {TodosContext} from '../../context/todosContext'
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';

const MyTodosPage : React.FC = () => {

  const { accountState } = useContext(AppContext);
  const { todoState, getTodos, loading } = useContext(TodosContext);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(()=>{
    if (todoState.myTodos.length>0){
      console.log('[DEBUG]: todo_state', todoState.myTodos)
    }
  }, [todoState.myTodos]);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      {loading && <SkeletonComponent/>}
      {
        !loading && todoState.myTodos.map((todo, index)=>{
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
      {
        (!loading && todoState.myTodos.length===0) && <>
        <Empty text="Nessuna nota trovata"></Empty>
      </>
      }
    </Stack>
  )
}

export default MyTodosPage
