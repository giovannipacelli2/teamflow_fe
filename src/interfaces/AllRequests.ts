import { GetAllUsernames200Response } from "../api";

export interface AllAccountsUsernamesI extends GetAllUsernames200Response{
    status?:number;
}