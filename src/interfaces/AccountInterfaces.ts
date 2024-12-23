import { AccountBodyReq } from "../api";


export interface updateAccountI {
    accountId : string,
    body: AccountBodyReq
}

export interface deleteAccountI {
    accountId : string
}
