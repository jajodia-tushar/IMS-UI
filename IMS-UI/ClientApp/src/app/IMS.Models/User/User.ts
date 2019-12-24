import { Role } from "./Role";

export class User {
    id: number;
    username: string;
    password?: any;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
