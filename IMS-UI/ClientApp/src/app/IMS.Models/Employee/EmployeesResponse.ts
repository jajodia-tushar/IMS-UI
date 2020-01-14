import { Employee } from './Employee';
import { Error } from '../Error';

export class EmployeesResponse {
    employees: Employee[];
    error: Error;
    status: String;
}
