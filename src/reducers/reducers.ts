import { AccountResponse, Auth } from "../api";
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

