export class DeleteResponse{
    public  status : Status;
    public  error : Error;
}

export enum Status{
    Failure,
    Success
}

export class Error{
    errorCode: number;
    errorMessage : string;
}