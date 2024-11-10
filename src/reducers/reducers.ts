import { AccountResponse, Auth, TodoBodyReq, TodoResponse } from "../api";
import { ActionMap } from "../types/generics";

/*--------------------------------------------------- AUTH --------------------------------------------------*/

export enum AuthTypes {
    UPDATE = 'update_auth',
    RESET = 'reset_auth'
}

type authPayload = {
    [AuthTypes.UPDATE]: Auth,
    [AuthTypes.RESET]: undefined
}

export type authActions = ActionMap<authPayload>[keyof ActionMap<authPayload>];

export const authReducer = (
    state: Auth,
    action: authActions
  ) => {
    switch (action.type) {
      case AuthTypes.UPDATE: {
          return {
              ...state,
              ...action.payload
          };
      }

      case AuthTypes.RESET: {
          return {
            status : "",
            accountId : "",
            authorization : {
              token: "",
              type: ""
            }
          };
      }
        
      default:
        return state;
    }
  };
/*------------------------------------------------- ACCOUNT -------------------------------------------------*/

export enum UserTypes {
    UPDATE = 'update_account',
    RESET = 'reset_account'
}

type accountPayload = {
    [UserTypes.UPDATE]: AccountResponse,
    [UserTypes.RESET]: undefined,
}

export type accountActions = ActionMap<accountPayload>[keyof ActionMap<accountPayload>];

export const accountReducer = (
    state: AccountResponse,
    action: accountActions
  ) => {
    switch (action.type) {
      case UserTypes.UPDATE:{
          return {
              ...state,
              ...action.payload
          };
      }
      case UserTypes.RESET:{
          return {
            id: "",
            username: "",
            name: "",
            surname: "",
            email: ""
          };
      }
        
      default:
        return state;
    }
  };

/*-------------------------------------------------- TODOS --------------------------------------------------*/

export enum TodosTypes {
    SET = 'set_todos',
    CREATE = 'create_todo',
    UPDATE = 'update_todo',
    DELETE = 'delete_todo'
}

type todosPayload = {
    [TodosTypes.SET]: {
        body : TodoResponse[]
    }
    [TodosTypes.CREATE]: {
        body : TodoBodyReq
    }
    [TodosTypes.UPDATE]: {
        id: string,
        body : TodoBodyReq
    }
    [TodosTypes.DELETE]: {
        id: string
    }
}

export type todosActions = ActionMap<todosPayload>[keyof ActionMap<todosPayload>];

export const todosReducer = (
    state: TodoResponse[],
    action: todosActions
  ) => {
    switch (action.type) {

        case TodosTypes.SET: {
            return [
                ...action.payload.body
            ];
        }

        case TodosTypes.CREATE: {
            return [
                ...state,
                action.payload.body
            ];
        }

        case TodosTypes.UPDATE: {
            return state.map((todo)=>{
                if (todo.id === action.payload.id){
                    return {
                        ...todo,
                        ...action.payload.body
                    }
                } else {
                    return todo
                }
            });
        }

        case TodosTypes.DELETE: {
            return state.filter((todo)=>todo.id !== action.payload.id);
        }

        default: return state;
    }
};

/*----------------------------------------------- SHARED TODOS ----------------------------------------------*/

export enum SharedTodosTypes {
    UPDATE = 'update_shared_todo',
}

type sharedTodosPayload = {

    [SharedTodosTypes.UPDATE]: {
        id: string,
        body : TodoBodyReq
    }
}

export type sharedTodosActions = ActionMap<sharedTodosPayload>[keyof ActionMap<sharedTodosPayload>];

export const sharedTodosReducer = (
    state: TodoResponse[],
    action: sharedTodosActions
  ) => {
    switch (action.type) {

        case SharedTodosTypes.UPDATE: {
            return state.map((todo)=>{
                if (todo.id === action.payload.id){
                    return {
                        ...todo,
                        ...action.payload.body
                    }
                } else {
                    return todo
                }
            });
        }

        default: return state;
    }
};