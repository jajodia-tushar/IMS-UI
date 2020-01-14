import { EmployeeOrderMapping } from "./EmployeeOrderMapping";

export class EmployeeOrdersResponse extends Response{
    employeeOrder: EmployeeOrderMapping[];
}