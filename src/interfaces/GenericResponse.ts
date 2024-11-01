export interface GenericResponse<T> {
    data : T,
    message : string;
    status : number;
}

export interface httpProcessedResponseType {
    data: unknown,
    message: string,
    status : number
}