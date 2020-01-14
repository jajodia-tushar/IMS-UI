import { EmployeeOrderMapping } from "./EmployeeOrderMapping";

export class EmployeeOrderResponse{
        employeeOrder: EmployeeOrderMapping;
        status: string;
        error: Error;
}