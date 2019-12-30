import { User } from "./User";


export class AdminListResponse extends Error{
  users: User[];
  status: string;
}
