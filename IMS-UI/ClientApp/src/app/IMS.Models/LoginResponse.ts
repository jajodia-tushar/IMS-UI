import { User } from "./User/User";

  export class LoginResponse {
    user: User;
    status: string;
    error: Error;
  }


