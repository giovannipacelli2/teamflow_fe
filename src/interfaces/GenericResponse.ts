export interface GenericResponse<T> {
    data : T,
    message : string;
    status : number;
}