
import { TodoApi, TodoBodyReq, CommentApi, CommentBodyReq } from '../api';

import { useQuery, useMutation } from '@tanstack/react-query'
import { createCommentI, deleteCommentI, deleteTodoI, shareTodoI, updateTodoI } from '../interfaces/TodosInterfaces';

export default function useTodos(enableAutoFetch=true) {

    //const queryClient = useQueryClient()
    
    const useGetTodo = (id: string) => {
      return useQuery({
          queryKey: ['todo', id],
          queryFn: () => {
              let todoApi = new TodoApi();
              return todoApi.getTodo(id)
          },
          enabled: !!id
      })
    }

    const getAllTodos = useQuery({
        queryKey: ['todos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllTodos(50,1,'created_at', 'desc')
        },
        enabled: enableAutoFetch,
    })

    const getAllSharedTodos = useQuery({
        queryKey: ['sharedTodos'],
        queryFn: ()=>{
            let todoApi = new TodoApi();
            return todoApi.getAllSharedTodos(50,1,'created_at', 'desc')
        },
        enabled: enableAutoFetch,
    })

    /* const getAllTodoAccounts = ({queryKey}: {queryKey:string[]})=>{

          const [todoId] = queryKey

          let todoApi = new TodoApi();
          return todoApi.getAllTodoAccounts(todoId)
    } */

    const createTodo = useMutation({
      mutationFn: (bodyReq:TodoBodyReq) => {
        let todoApi = new TodoApi();

        return todoApi.createTodo(bodyReq);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
      }
    })

    const updateTodo = useMutation({
      mutationFn: (bodyReq:updateTodoI) => {
        let todoApi = new TodoApi();

        const {todoId, body} = bodyReq;
        return todoApi.updateTodo(todoId, body);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
        getAllSharedTodos.refetch();
      }
    })

    const shareTodo = useMutation({
      mutationFn: (bodyReq:shareTodoI) => {
        let todoApi = new TodoApi();

        const {todoId, body} = bodyReq;
        return todoApi.shareTodo(todoId, body);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
        getAllSharedTodos.refetch();
      }
    })

    const deleteTodo = useMutation({
      mutationFn: (bodyReq:deleteTodoI) => {
        let todoApi = new TodoApi();

        const {todoId} = bodyReq;
        return todoApi.deleteTodo(todoId);
      },
      onSuccess:()=>{
        getAllTodos.refetch();
      }
    })

    const createComment = useMutation({
      mutationFn: (bodyReq:createCommentI) => {
        let commentApi = new CommentApi();

        const {todoId, body} = bodyReq;
        return commentApi.createComment(todoId, body);
      },
    })

    const deleteComment = useMutation({
      mutationFn: (bodyReq:deleteCommentI) => {
        let commentApi = new CommentApi();

        const {commentId} = bodyReq;
        return commentApi.deleteComment(commentId);
      },
    })

    return { useGetTodo, getAllTodos, getAllSharedTodos, createTodo, updateTodo, deleteTodo, shareTodo, createComment, deleteComment };
}