import { ShareTodoRequest, TodoBodyReq } from "../api";

export interface GetAllTodoAccountParams {
    todoId : string
}

export interface updateTodoI {
    todoId : string,
    body: TodoBodyReq
}

export interface shareTodoI {
    todoId : string,
    body: ShareTodoRequest
}

export interface deleteTodoI {
    todoId : string,
  }