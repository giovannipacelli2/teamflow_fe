import { TodoBodyReq } from "../api";

export interface GetAllTodoAccountParams {
    todoId : string
}

export interface updateTodoI {
    todoId : string,
    body: TodoBodyReq
}

export interface deleteTodoI {
    todoId : string,
  }