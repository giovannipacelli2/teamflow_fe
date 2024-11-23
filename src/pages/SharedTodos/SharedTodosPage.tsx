import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from "../../context/context";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import {TodosContext} from '../../context/todosContext'

// Components
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';

const SharedTodosPage : React.FC = () => {
/*   const { accountState } = useContext(AppContext);
  const { todoState, getSharedTodos, loading } = useContext(TodosContext);

  useEffect(()=>{
    if (todoState.sharedTodos.length>0){
      console.log('[DEBUG]: todo_state', todoState.sharedTodos)
    }
  }, [todoState.sharedTodos]);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      {loading && <SkeletonComponent/>}
      {
        !loading && todoState.sharedTodos.map((todo, index)=>{
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
                <Button size="small" color="primary" sx={{display:"flex", gap:"0.5em"}}>
                  <AddCommentOutlinedIcon></AddCommentOutlinedIcon>
                    commenta
                  </Button>
              </CardActions>
            </Card>
          );
        })
      }
      {
        (!loading &&  todoState.sharedTodos.length===0) && <>
          <Empty text="Nessuna nota trovata"></Empty>
        </>
      }
    </Stack>
  ) */
 return(<>sharedTodos</>)
}

export default SharedTodosPage
