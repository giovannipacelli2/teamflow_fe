import { CommentBodyReq, ShareTodoRequest, TodoBodyReq } from "../api";

export interface GetAllTodoAccountParams {
    todoId : string
}

export interface updateTodoI {
    todoId : string,
    body: TodoBodyReq
}
export interface createCommentI {
    todoId : string,
    body: CommentBodyReq
}

export interface shareTodoI {
    todoId : string,
    body: ShareTodoRequest
}

export interface deleteTodoI {
    todoId : string,
}

export interface deleteCommentI {
    commentId : string,
}