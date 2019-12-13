import { Employee } from './Employee';
import {Error} from '../Error';

export class EmployeeResponse {
  employee: Employee;
  error: Error;
  status: String;
}
