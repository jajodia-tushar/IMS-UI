import { Employee } from "../Employee/Employee";
import { Error } from "../Error";
import { EmployeeOrderMapping } from "../Employee/EmployeeOrderMapping";

export class RecentEntriesResponse {
  employeeRecentOrders: EmployeeOrderMapping[];
  status: string;
  error: Error;
}
