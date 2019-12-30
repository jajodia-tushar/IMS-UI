import { User } from "./User/User";

export class LoginResponse extends Error {
    user: User;
    status: string;
  }


