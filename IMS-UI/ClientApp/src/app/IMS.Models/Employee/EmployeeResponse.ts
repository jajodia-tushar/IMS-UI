import { Employee } from './Employee';
import { Response } from '../Shared/Response';

export class EmployeeResponse extends Response {
  employee: Employee;
}
