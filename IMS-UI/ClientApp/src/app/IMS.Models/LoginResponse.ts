 


  export class Role {
    id: number;
    name: string;
  }

  export class User {
    id: number;
    username: string;
    password?: any;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
export class Error {
  errorCode: number;
  errorMessage: string;
}

  export class LoginResponse {
    accessToken: string;
    user: User;
    status: string;
    error: Error;
  }


