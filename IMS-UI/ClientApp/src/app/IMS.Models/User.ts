import { Role } from "./Role";

export class User {
    id: string;
    username: string;
    password?: any;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
