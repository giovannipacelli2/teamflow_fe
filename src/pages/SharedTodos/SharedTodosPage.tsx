import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from "../../context/context";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material';

// Components
import Empty from '../../components/Empty/Empty';
import SkeletonComponent from '../../components/Skeleton/Skeleton';
import useTodos from '../../hooks/useTodos';
import { TodoResponse } from '../../api';
import useModalEditNote from '../../components/ModalEditNote/ModalEditNote';
import { FieldValues } from 'react-hook-form';
import { updateTodoI } from '../../interfaces/TodosInterfaces';
import { AlertContext } from '../../context/alertContext';

const SharedTodosPage : React.FC = () => {

  const theme = useTheme();

  const { setAlertType, openAlert } = useContext(AlertContext);
  const { getAllSharedTodos, updateTodo, useGetTodo } = useTodos();
  const { data:sharedTodoState, isLoading:sharedTodosLoading, isError:sharedTodosError} = getAllSharedTodos;

  const { accountState } = useContext(AppContext)
  const [currentTodo, setCurrentTodo] = useState<string>('');

  //modals
  const {ModalComponent: ModalUpdate} = useModalEditNote();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  useEffect(()=>{
    getAllSharedTodos.refetch();
  }, []);


  const onEdit = React.useCallback((event: FieldValues)=>{
    
    if (currentTodo){
      let body : updateTodoI = {
        todoId : String(currentTodo),
        body : event
      }
  
      updateTodo.mutate(body);
      setCurrentTodo('');
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

    const getTodoList = ()=>{

      let res = sharedTodoState?.data.data?.data ?? []
      
      if (!res) return[];
  
      let allTodos : TodoResponse[] = [...res];
  
      let todoList = [];
  
      for(let todo of allTodos){
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
                setIsOpenCreate(true);
                setCurrentTodo(todo.id ?? '');
              }}
              sx={{
                height:'8em'
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
                    height:'3em'
                  }}
                >
                  {todo.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions >
              <Button size="small" color="primary" sx={{display:"flex", gap:"0.5em"}}
                onClick={()=>{
                  setIsOpenCreate(true);
                  setCurrentTodo(todo.id ?? '');
                }}
              >
                <AddCommentOutlinedIcon></AddCommentOutlinedIcon>
                  commenta
                </Button>
            </CardActions>
          </Card>
        );
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
      >
        <Button size="medium" color="primary" variant="contained" onClick={()=>getAllSharedTodos.refetch()}>
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
        width={{ xs: '100%', sm: '90%'}}
      >
        {(sharedTodosLoading || getAllSharedTodos.isRefetching) && <SkeletonComponent/>}
        {
          !(sharedTodosLoading || getAllSharedTodos.isRefetching) && getTodoList()
        }
        {
          (!sharedTodosLoading && !sharedTodosError && getTodoList().length===0) && <>
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
        setIsOpen={setIsOpenCreate}
        permissions='limitated'
        id={currentTodo}
      >
      </ModalUpdate>

    </Stack>
  )

}

export default SharedTodosPage
