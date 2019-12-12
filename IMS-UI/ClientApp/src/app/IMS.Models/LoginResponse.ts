import { User } from "./User";

  export class LoginResponse {
    user: User;
    status: string;
    error: Error;
  }


