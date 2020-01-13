import { EmployeeOrder } from "./EmployeeOrder";

export class EmployeeOrderResponse{
        employeeOrder: EmployeeOrder;
        status: string;
        error: Error;
}