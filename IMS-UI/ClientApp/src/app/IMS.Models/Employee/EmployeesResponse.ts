import { Employee } from './Employee';
import { Error } from '../Error';
import { PagingInfo } from '../Shared/PagingInfo';
import { PagingInformation } from '../Admin/StockStatusResponse';

export class EmployeesResponse {
    employees: Employee[];
    pagingInfo: PagingInformation;
    error: Error;
    status: String;
}
