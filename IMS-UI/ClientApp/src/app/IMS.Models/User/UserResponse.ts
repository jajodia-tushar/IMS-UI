import { User } from "./User";

export class UserResponse {
    user : User;
    success : string;
    error : Error;
}