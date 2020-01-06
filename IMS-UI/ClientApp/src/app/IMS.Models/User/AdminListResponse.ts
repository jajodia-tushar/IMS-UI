import { User } from "./User";
import { Error } from "../Shared/Error";


export class AdminListResponse extends Error {
  users: User[];
  status: string;
}
