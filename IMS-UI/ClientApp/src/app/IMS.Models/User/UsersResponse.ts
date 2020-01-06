import { User } from "./User";

export class UsersResponse {
    users : User[];
    success : string;
    error : Error;
}